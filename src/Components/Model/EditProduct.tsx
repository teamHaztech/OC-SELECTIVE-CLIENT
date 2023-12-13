import {
  Box,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import { OButton, WButton } from "../Common/Button";
import { Header1 } from "../Common/HeaderText";
import { Input } from "../Common/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LoadingBar from "../Headers/LoadingBar";
import { useParams } from "react-router-dom";
import adminTokenAxios from "../../Hooks/AdminTokenAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ParaText1 } from "../Common/ParaText";

type Inputs = {
  p_name?: string;
  p_description?: string;
  p_price?: string;
  p_image?: any;
  test_month_limit?: string;
  release_date?: string;
};

const EditProduct = () => {
  const queryClient = useQueryClient();
  const para = useParams();
  const { handlePREditClose, productEdit } = UserContext();
  const { register, handleSubmit, control } = useForm<Inputs>();

  const p_id = para["*"]?.slice(30);
  const cacheProductData: any = queryClient.getQueryData([
    "ViewProductDetails1",
    p_id
  ]);
// console.log(updatedData?.categories);

  const updateProductMU = useMutation({
    mutationFn: async (data: Inputs) => {
      return await adminTokenAxios.put(
        `/admin/update-test-series-product/${p_id}`,
        data
      );
    },
    onSuccess(res) {
     res.data.product_detail.categories = cacheProductData.categories;
      console.log(res.data);
      queryClient.setQueryData(['ViewProductDetails1',p_id],res.data.product_detail);
      handlePREditClose();
    },
  });
  // console.log(productEdit);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["ViewProductDetails", productEdit,updateProductMU.data],
  //   queryFn: async () => {
  //     return await adminTokenAxios.get(`admin/show-product-details/${p_id}`);
  //   },
  //   enabled:productEdit
  // });
  // console.log(data);
  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    // console.log(para_data);
    updateProductMU.mutate(para_data);
  };

  
  const product = cacheProductData;
  return (
    <Dialog
      onClose={handlePREditClose}
      open={productEdit}
      sx={{ height: "630px" }}
    >
      <Box
        sx={{
          width: { lg: "482px", md: "482px", sm: "482px", xs: "320px" },
          height: "730px",
          display: "flex",
          flexDirection: "column",
          px: "40px",
          py: "20px",
        }}
      >
        {/* {isLoading ? (
          <LoadingBar />
        ) : ( */}
          <>
            <Stack
              spacing={1}
              direction="row"
              margin="auto"
              sx={{ my: "10px" }}
            >
              {/* <LockOpenIcon
            sx={{ height: "30px", width: "30px", color: "#FA8128" }}
          /> */}
              <Header1 header="EDIT PRODUCT" />
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} direction="column" margin="auto">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Input
                    label="Package Name"
                    type="text"
                    reg={register("p_name")}
                    defaultVal={product?.p_name}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Input
                    label="Product Description"
                    type="text"
                    reg={register("p_description")}
                    defaultVal={product?.p_description}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <ParaText1
                    text={"Test month limit"}
                    css={{ textAlign: "left" }}
                  />
                  <Controller
                    name="test_month_limit"
                    control={control}
                    defaultValue={product?.test_month_limit}
                    render={({ field }) => (
                      <FormControl fullWidth sx={{ bgcolor: "white" }}>
                        <Select
                          defaultValue={product?.test_month_limit}
                          placeholder="select"
                          {...field}
                        >
                          <MenuItem value="" disabled>
                            <em>Choose</em>
                          </MenuItem>
                          <MenuItem value={3}>3 Months</MenuItem>
                          <MenuItem value={6}>6 Months</MenuItem>
                          <MenuItem value={12}>12 Months</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Input
                    label="Price"
                    type="text"
                    reg={register("p_price")}
                    defaultVal={product?.p_price}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Input
                    required={false}
                    label="Release Date"
                    type="date"
                    reg={register("release_date")}
                    defaultVal={product?.release_date}
                  />
                </Box>
                <Stack
                  spacing={{ lg: 6, md: 6, sm: 6, xs: 2 }}
                  direction="row"
                  marginX="auto"
                  paddingTop={2}
                >
                  <WButton
                    name="CANCEL"
                    css={{ width: "177px" }}
                    func={handlePREditClose}
                  />
                  <OButton
                    name={updateProductMU.isLoading ? "Updating..." : "Update"}
                    css={{ width: "177px" }}
                    type={updateProductMU.isLoading ? "button" : "submit"}
                  />
                </Stack>
              </Stack>
            </form>
          </>
        {/* )} */}
      </Box>
    </Dialog>
  );
};

export default EditProduct;
