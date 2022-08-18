import Head from "next/head";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Task from "../component/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [backlog, setbacklog] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [done, setDone] = useState([]);
  const [input, setInput] = useState("");

  const renderBacklog = () => {
    return backlog.map((val, idx) => {
      return (
        <Task
          taskName={val}
          status={0}
          deleteTask={() => deleteTask(idx, 0)}
          moveNext={() => {
            moveToNextStage(0, idx);
          }}
        />
      );
    });
  };

  const renderToDo = () => {
    return toDo.map((val, idx) => {
      return (
        <Task
          taskName={val}
          status={1}
          deleteTask={() => deleteTask(idx, 1)}
          moveNext={() => {
            moveToNextStage(1, idx);
          }}
          movePrev={() => {
            movePrevStage(1, idx);
          }}
        />
      );
    });
  };

  const renderOngoing = () => {
    return ongoing.map((val, idx) => {
      return (
        <Task
          taskName={val}
          status={2}
          deleteTask={() => deleteTask(idx, 2)}
          moveNext={() => {
            moveToNextStage(2, idx);
          }}
          movePrev={() => {
            movePrevStage(2, idx);
          }}
        />
      );
    });
  };

  const renderDone = () => {
    return done.map((val, idx) => {
      return (
        <Task
          taskName={val}
          status={3}
          deleteTask={() => deleteTask(idx, 3)}
          movePrev={() => {
            movePrevStage(3, idx);
          }}
        />
      );
    });
  };

  const addNewTask = async () => {
    if (!input) {
      return;
    }
    setbacklog([...backlog, input]);
    setInput("");
  };

  const deleteTask = (index, stage) => {
    if (stage == 0) {
      const newBacklog = [...backlog];
      newBacklog.splice(index, 1);
      setbacklog(newBacklog);
    }

    if (stage == 1) {
      const newToDo = [...toDo];
      newToDo.splice(index, 1);
      setToDo(newToDo);
    }

    if (stage == 2) {
      const newOngoing = [...ongoing];
      newOngoing.splice(index, 1);
      setOngoing(newOngoing);
    }

    if (stage == 3) {
      const newDone = [...done];
      newDone.splice(index, 1);
      setDone(newDone);
    }
  };

  const moveToNextStage = (stage, index) => {
    if (stage == 3) {
      return;
    }

    if (stage == 0) {
      const splicedData = backlog.splice(index, 1);
      setToDo([...toDo, splicedData]);
    }
    if (stage == 1) {
      const splicedData = toDo.splice(index, 1);
      setOngoing([...ongoing, splicedData]);
    }

    if (stage == 2) {
      const splicedData = ongoing.splice(index, 1);
      setDone([...done, splicedData]);
    }
  };

  const movePrevStage = (stage, index) => {
    if (stage == 0) {
      return;
    }

    if (stage == 1) {
      const splicedData = toDo.splice(index, 1);
      setbacklog([...backlog, splicedData]);
    }

    if (stage == 2) {
      const splicedData = ongoing.splice(index, 1);
      setToDo([...toDo, splicedData]);
    }

    if (stage == 3) {
      const splicedData = done.splice(index, 1);
      setOngoing([...ongoing, splicedData]);
    }
  };

  useEffect(() => {
    const backlogStorage = localStorage.getItem("backlog");
    const todoStorage = localStorage.getItem("todo");
    const ongoingStorage = localStorage.getItem("ongoing");
    const doneStorage = localStorage.getItem("done");
    setbacklog(JSON.parse(backlogStorage) || []);
    setToDo(JSON.parse(todoStorage) || []);
    setOngoing(JSON.parse(ongoingStorage) || []);
    setDone(JSON.parse(doneStorage) || []);
  }, []);

  useEffect(() => {
    if (backlog.length || toDo.length || ongoing.length || done.length) {
      localStorage.setItem("ongoing", JSON.stringify(ongoing));
      localStorage.setItem("done", JSON.stringify(done));
      localStorage.setItem("backlog", JSON.stringify(backlog));
      localStorage.setItem("todo", JSON.stringify(toDo));
    }
  }, [backlog, toDo, ongoing, done]);

  return (
    <Box display="flex" justifyContent="center">
      <Box width={"75%"}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <TextField
            label={"New Task"}
            sx={{ marginY: 2, width: "75%" }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            variant="contained"
            sx={{ height: "55px", marginLeft: 2 }}
            onClick={() => addNewTask()}
          >
            Add New Task
          </Button>
        </Box>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={3}>
            <Box
              sx={{
                border: "2px solid black",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                paddingY={2}
                sx={{ borderBottom: "1px solid black" }}
              >
                <Typography>Backlog</Typography>
              </Box>
              {renderBacklog()}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                border: "2px solid black",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                paddingY={2}
                sx={{ borderBottom: "1px solid black" }}
              >
                <Typography>To Do</Typography>
              </Box>
              {renderToDo()}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                border: "2px solid black",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                paddingY={2}
                sx={{ borderBottom: "1px solid black" }}
              >
                <Typography>Ongoing</Typography>
              </Box>
              {renderOngoing()}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                border: "2px solid black",
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                paddingY={2}
                sx={{ borderBottom: "1px solid black" }}
              >
                <Typography>Done</Typography>
              </Box>
              {renderDone()}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
