import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";

export interface Require {
    src: string,
    title: string,
}
const MyDialog = (props: Require) => {

    const { src, title } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Show
            </Button>
            <Dialog maxWidth={`sm`} open={open}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <img width={`100%`} src={src} alt={title}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MyDialog;