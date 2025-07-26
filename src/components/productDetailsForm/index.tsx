import React, { useEffect, useState } from "react";
import Input from "../inputwithlabel";
import { Link, useNavigate } from "react-router-dom";
import { ErrorRequest, handleAddProducts, handleFastActive, handleFindById, handleupdateProduct } from "../../services/productService/productService";
import { ProductUpdate, ProductCreated } from "../../models/ProductModels";

interface Props {
  btnMessage: string;
  id?: string;
  onHandleAlert: (res: boolean, message?: string) => void;
}

const ProductDetailsForm = ({ btnMessage, id, onHandleAlert }: Props) => {
  const [description, setDescription] = useState('');
  const [costValue, setCostValue] = useState('');
  const [value, setValue] = useState('');
  const [offValue, setOffValue] = useState('');
  const [category, setCategory] = useState('BEVERAGE');
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState<boolean>();
  const [newQuantity, setNewQuantity] = useState('0');
  const [product, setProduct] = useState<ProductCreated | undefined>();


  useEffect(() => {
    handleFindById(id!).then(response => {
      if (response.status == 400) {
        const data = response.response as ErrorRequest
        onHandleAlert(false, data.message)
      } else {
        const data = response.response as ProductCreated
        setProduct(data)
      }
    })
  }, []);

  useEffect(() => {
    handleProduct()
  }, [product])

  const handleProduct = () => {
    if (!product) return;
    setCategory(product.category);
    setCostValue(handleCurrency(product.costPrice * 100));
    setDescription(product.description);
    setOffValue(handleCurrency(product.offPrice * 100));
    setValue(handleCurrency(product.sellingPrice * 100));
    setQuantity(product.quantity.toLocaleString())
    setIsActive(product.isActive)
  }

  const handleAddQuantity = () => {
    handleAddProducts(product?.id.toLocaleString()!, newQuantity).then(response => {
      if (response.status == 400) {
        const data = response.response as ErrorRequest
        onHandleAlert(false, data.message)
      } else {
        const data = response.response as ProductCreated
        setProduct(data)
        onHandleAlert(true)
      }
    })
  }

  const handleModal = () => {
    setNewQuantity('0')
  }

  const handleCreateProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productUpdate: ProductUpdate = {
      category,
      costPrice: parseCurrency(costValue),
      description,
      offPrice: parseCurrency(offValue),
      sellingPrice: parseCurrency(value),
      isActive: isActive!
    };


    handleupdateProduct(id!, productUpdate).then(response => {
      if (response.status == 400) {
        const data = response.response as ErrorRequest
        onHandleAlert(false, data.message)
      } else {
        const data = response.response as ProductCreated
        setProduct(data)
        onHandleAlert(true)
      }
    })

  };

  const handleActiveFast = () => {
    handleFastActive(id!).then(response => {
      if (response.status == 400) {
        const data = response.response as ErrorRequest
        onHandleAlert(false, data.message)
      } else {
        const data = response.response as ProductCreated
        setProduct(data)
        onHandleAlert(true)
      }
    })
  }

  const handleNumber = (v: string | number): string => {
    const valueStr = typeof v === "number" ? v.toString() : v;
    const justNumbers = valueStr.replace(/\D/g, '');
    const number = Number(justNumbers);
    return number.toLocaleString();
  }

  const handleCurrency = (v: string | number): string => {
    const valueStr = typeof v === "number" ? v.toString() : v;
    const justNumbers = valueStr.replace(/\D/g, '');
    const number = Number(justNumbers) / 100;
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const parseCurrency = (valor: string): number => {
    return parseFloat(valor.replace(/[R$\s.]/g, '').replace(",", ".")) || 0;
  };

  return (
    <form onSubmit={handleCreateProduct} className="w-100">
      <div className="d-flex w-100">
        <Input
          label="Quantidade"
          value={quantity}
          onChange={() => { }}
          type="text"
          onBlur={() => { }}
          disabled={true}
        />
        <Input
          label="Descrição"
          value={description}
          onChange={setDescription}
          type="text"
          onBlur={() => { }}
        />
      </div>
      <div className="d-flex w-100">
        <Input
          label="Preço de custo"
          value={costValue}
          onChange={(val) => setCostValue(handleCurrency(val))}
          type="text"
          onBlur={() => { }}
        />
        <Input
          label="Preço de venda"
          value={value}
          onChange={(val) => setValue(handleCurrency(val))}
          type="text"
          onBlur={() => { }}
        />
      </div>
      <div className="row">
        <div className="col-6">
          <Input
            label="Preço de oferta"
            value={offValue}
            onChange={(val) => setOffValue(handleCurrency(val))}
            type="text"
            onBlur={() => { }}
          />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onChange={handleActiveFast}
                  checked={isActive!} />
                <label className="form-check-label" htmlFor="exampleCheck1">Ativo</label>
              </div>
              <span className="border border-black mb-2"></span>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDefault"
                  id="beverage"
                  value="BEVERAGE"
                  checked={category === "BEVERAGE"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="form-check-label" htmlFor="beverage">
                  Bebida
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioDefault"
                  id="food"
                  value="FOOD"
                  checked={category === "FOOD"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="form-check-label" htmlFor="food">
                  Comida
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Link to={'/admin'} className="btn btn-dark">Dashboard</Link>
        <Link to={'/products'} className="btn btn-dark">Produtos</Link>
        <button onClick={handleModal} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Adicionar quantidade
        </button>
        <button type="submit" className="btn btn-dark">{btnMessage}</button>


        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Adicionar mercadoria</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div>
                  <Input
                    label=""
                    value={newQuantity}
                    onChange={(val) => setNewQuantity(handleNumber(val))}
                    type="text"
                    onBlur={() => { }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Canclear</button>
                <button onClick={handleAddQuantity} type="button" data-bs-dismiss="modal" className="btn btn-dark">Adicionar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductDetailsForm;
