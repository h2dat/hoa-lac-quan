import { Image } from "./image";
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from "./AlertBox"
import React, {useState} from "react";

export const Products = (props) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false)
  const titleAlert = "Sản phẩm hiện chưa phục vụ"
  const messageAlert = "Rất xin lỗi về sự bất tiện này, sản phẩm hiện đã hết hoặc chưa được cập nhập vui lòng thử lại sau!"
  const handleItemClick = (e, product) => {
    e.preventDefault()
    if (product.status === 'comming_soon') {
      setOpenAlert(true)
    }
    else {
      localStorage.setItem('productId', product.id)
      navigate('/detail');
    }
  };
  const handleClose = () => {
    setOpenAlert(false);
  };
  return (
    <div id="products" className="text-center">
      <AlertDialog open={openAlert} onClose={handleClose} title={titleAlert} message={messageAlert}/>
      <div className="container">
        <div className="section-title">
          <h2>Products</h2>
          <p>
            Nốt Hương Đặc Sản – Nguyên Bản – Thủ Công
          </p>
        </div>
        <div className="row">
          <div className="products-items">
            {props.data
              ? props.data.map((item, i) => (
                <div
                  key={item.id}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <Link to={'/detail'} onClick={(e) => { handleItemClick(e, item) }}>
                    <Image
                      title={item.name}
                      largeImage={item.Image[0]}
                    />
                  </Link>
                </div>
              ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
