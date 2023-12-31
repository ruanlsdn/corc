import React from "react";
import {
  AdaptedDialog,
  Alert,
  AlertButtons,
  ProductsList,
  Searchbar,
  UpsertProduct,
} from "../../components";
import {
  useApplicationControlContext,
  useDataControlContext,
} from "../../contexts";
import { useAxios } from "../../hooks";
import { axiosProductService } from "../../services";

export default function ProductsScreen() {
  const { fetchData } = useAxios();
  const { products, selectedProduct, setRefreshProducts } =
    useDataControlContext();
  const {
    isCreateProductDialogOpen,
    setIsCreateProductDialogOpen,
    isEditProductDialogOpen,
    setIsEditProductDialogOpen,
    isDeleteProductAlertOpen,
    setIsDeleteProductAlertOpen,
  } = useApplicationControlContext();

  const handleCancelButton = () => {
    setIsDeleteProductAlertOpen(false);
  };

  const handleConfirmButton = () => {
    fetchData({
      axiosInstance: axiosProductService,
      method: "delete",
      url: `/${selectedProduct?.id}`,
    });
    setIsDeleteProductAlertOpen(false);
    setRefreshProducts((prev) => !prev);
  };

  return (
    <>
      <Searchbar />
      <ProductsList list={products} />
      <Alert
        title="Excluir"
        description="Tem certeza que deseja excluir o produto?"
        isOpen={isDeleteProductAlertOpen}
        setIsOpen={setIsDeleteProductAlertOpen}
        children={
          <AlertButtons
            handleCancelButton={handleCancelButton}
            handleConfirmButton={handleConfirmButton}
          />
        }
      />
      <AdaptedDialog
        title="Cadastrar"
        description="Preencha os campos abaixo e confirme para salvar o produto:"
        isOpen={isCreateProductDialogOpen}
        setIsOpen={setIsCreateProductDialogOpen}
        children={<UpsertProduct isUpdate={false} />}
      />
      <AdaptedDialog
        title="Editar"
        description="Atualize os campos abaixo e confirme para salvar suas alterações:"
        isOpen={isEditProductDialogOpen}
        setIsOpen={setIsEditProductDialogOpen}
        children={<UpsertProduct isUpdate={true} />}
      />
    </>
  );
}
