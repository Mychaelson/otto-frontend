import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ taskName, status, deleteTask, moveNext, movePrev }) => {
  return (
    <Box>
      <ul>
        <li>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingRight={2}
          >
            <Typography>{taskName}</Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                size="small"
                disabled={status == 0 ? true : false}
                onClick={movePrev}
              >
                <ArrowBackIosNewIcon fontSize="2px" />
              </IconButton>
              <IconButton
                size="small"
                onClick={moveNext}
                disabled={status == 3 ? true : false}
              >
                <ArrowForwardIosIcon fontSize="2px" />
              </IconButton>
              <IconButton size="small" onClick={deleteTask}>
                <DeleteIcon fontSize="2px" />
              </IconButton>
            </Box>
          </Box>
        </li>
      </ul>
    </Box>
  );
};

export default Task;
