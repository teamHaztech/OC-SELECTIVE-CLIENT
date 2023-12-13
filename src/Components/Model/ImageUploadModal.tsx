import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@tanstack/react-query";
import adminTokenAxios from "../../Hooks/AdminTokenAxios";
import AlertBox from "../Common/AlertBox";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",

  height: "full",
  minHeight: "300px",
  maxHeight: "calc(100vh - 200px)",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface ModalProps {
  subject: any;
  handleClose?: () => void;
  open: boolean;
}

type FormData = {
  tsc_id: any;
  images: any;
};

const ImageUploadModal = ({ open, handleClose, subject }: ModalProps) => {
  const { register, control, handleSubmit, reset } = useForm<FormData>();

  const [multipleImages, setMultipleImages] = React.useState([]);
  const [open1, setOpen1] = React.useState<boolean>(false);
  const [open2, setOpen2] = React.useState<boolean>(false);

  const handleAlertBoxOpen = () => {
    setOpen1(true);
  };

  const handleAlertBoxClose = () => {
    setOpen1(false);
  };

  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };
  // Functions to preview multiple images
  const changeMultipleFiles = (e: any) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      setMultipleImages((prevImages: any) => {
        return prevImages.concat(imageArray);
      });
    }
  };

  const uploadImagesMutation = useMutation({
    mutationFn: async (formattedData: any) => {
      console.log("muttate", formattedData);
      return await adminTokenAxios.post(`/admin/image-upload`, formattedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
      handleAlertBoxOpen2();
    },
    onSuccess: (res) => {
      if (res.status == 200) {
        // setData(res?.data?.data);
        // setCategory(res?.data?.tspc);
        // setOpen(true);
        handleAlertBoxOpen();
        reset();
      } else {
        // handleAlertBoxOpen();
      }
    },
  });

  const onSubmit = (data: any) => {
    // console.log("multipleImages", multipleImages);
    // const formData = new FormData();
    // for (const key of Object.keys(multipleImages)) {
    //   console.log("loop", data.images[key]);
    //   formData.append("picture", data.images[key]);
    // }
    // fetch('http://localhost:3001/files', {
    //   method: 'POST',
    //   body: formData,
    // }).then((res) => console.log(res));
    const newData = Object.values(data.images);
    // console.log("image upload F", formData);
    console.log(" DATA", data);
    // console.log("image upload D", newData);
    uploadImagesMutation.mutateAsync(data);
    setMultipleImages([]); // You'll get an array of File objects here
  };

  return (
    <div>
      <AlertBox
        name="Successfully uploaded Images"
        type="success"
        bol={open1}
        handleAlertBoxClose={handleAlertBoxClose}
      />

      <AlertBox
        name="Please try again"
        type="error"
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
            >
              <CloseIcon />
            </IconButton>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel
                      sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                      id="select-category"
                    >
                      Select Subject
                    </FormLabel>
                    <Controller
                      name="tsc_id"
                      control={control}
                      defaultValue="" // Set default value as needed
                      rules={{ required: "This field is required" }} // Add validation rules as needed
                      render={({ field }) => (
                        <RadioGroup
                          row
                          aria-labelledby="select-category"
                          {...field}
                          // onChange={handleRadioChange}
                        >
                          {subject.map((item: any) => {
                            console.log(item.id);
                            
                            if(item.id != 2){
                              return (<FormControlLabel
                                // onClick={(e: any) =>
                                //   mutation.mutate(e.target.value)
                                // }
                                key={item.tsc_type}
                                value={item.id}
                                control={<Radio />}
                                label={item.tsc_type}
                              />)
                            }
                          
                          })}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {/* <Controller
            name="images"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                multiple
        
              />
            )}
          /> */}
                  <input
                    type="file"
                    multiple
                    {...register("images", { required: true })}
                    // onChange={changeMultipleFiles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Upload Images
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImageUploadModal;
