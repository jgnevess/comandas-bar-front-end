import React, { useEffect, useState } from "react";
import Input from "../inputwithlabel";
import { useNavigate } from "react-router-dom";
import { ProductCreate } from "../../models/ProductModels";
import { ErrorRequest, handleCreateProductService } from "../../services/productService/productService";

interface Props {
  btnMessage: string;
  onReload: (res: boolean, message?: string) => void
}

const ProductForm = ({ btnMessage, onReload }: Props) => {
  const [description, setDescription] = useState('');
  const [costValue, setCostValue] = useState('');
  const [value, setValue] = useState('');
  const [offValue, setOffValue] = useState('');
  const [category, setCategory] = useState('BEVERAGE');

  const navigate = useNavigate();

  const handleCreateProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productCreate: ProductCreate = {
      category,
      costPrice: parseCurrency(costValue),
      description,
      offPrice: parseCurrency(offValue),
      sellingPrice: parseCurrency(value)
    };
    handleCreateProductService(productCreate).then((response) => {
      if (response.status == 400) {
        const data = response.response as ErrorRequest
        onReload(false, data.message)
      }
      else {
        onReload(true)
      }
    });
  };

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
      <Input
        label="Descrição"
        value={description}
        onChange={setDescription}
        type="text"
        onBlur={() => { }}
        classname={{ status: true, classname: "form-control w-100 py-2 rounded bg-dark text-light" }}
      />
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
      <div className="d-flex flex-row-reverse">
        <button type="submit" className="btn btn-dark">{btnMessage}</button>
      </div>
    </form>
  );
};

export default ProductForm;
