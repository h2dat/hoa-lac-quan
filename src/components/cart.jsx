import React, { useEffect, useState } from 'react';
import Modal from "./banner"
import JsonData from '../data/data.json';
import { FaArchive } from "react-icons/fa";
import emailjs from "emailjs-com";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Box
} from '@material-ui/core'
import AlertDialog from "./AlertBox"

const Cart = () => {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const titleAlert = "Đặt hàng thành công"
  const messageAlert = "Sản phẩm đã được ghi nhận. Quét QR để thực hiện thanh toán!"
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (cart) {
      setTotal(0)
      cart.forEach(element => {
        const product = JsonData.Products.find(product => product.id === parseInt(element.id));
        const itemTotalPrice = product.price * (element.quantity || 0);
        setTotal(prevTotal => prevTotal + itemTotalPrice);
      });
    }
  }, [cart]);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const handleQuantityChange = (event, id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: event.target.value
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };
  const handleCloseForm = () => {
    setIsOpenForm(false)
  }
  const handleCloseAlert = () => {
    setIsOpenAlert(false)
  }
  const cartItems = (cartItem) => {
    const product = JsonData.Products.find(product => product.id === parseInt(cartItem.id));
    const itemTotalPrice = product.price * (cartItem.quantity || 0);
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', zIndex: 1000 }}>
          <AlertDialog open={isOpenAlert} onClose={handleCloseAlert} title={titleAlert} message={messageAlert} />
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            imageUrls={['../img/QR/1.jpg', '../img/QR/2.jpg']}
          />

        </div>

        <div className='row'>

          <div className="col-md-6" style={{ marginBottom: 20 }}>
            <div className="container py-4 border-bottom" >
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img src={`../${product.Image[0]}`} alt={cartItem.title} height="200px" width="180px" className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <h3>{cartItem.name}</h3>
                  <p className="lead fw-bold">${product.price}</p>
                  <div className="col rounded-pill">
                    <input
                      type="number"
                      className="form-control"
                      value={cartItem.quantity || 0}
                      onChange={(e) => handleQuantityChange(e, cartItem.id)}
                      min={1}
                      style={{ borderRadius: 20, marginLeft: 0, maxWidth: '10rem' }}
                    />
                  </div>
                </div>
                <div className="col-md-3" style={{ marginTop: 20 }}>
                  <div className="row justify-content-end">
                    <div className="col-md-4">
                      <h5>Total: </h5>
                    </div>
                    <div className="col-md-6">
                      <h5>${itemTotalPrice}</h5>
                    </div>
                  </div><FaArchive onClick={() => removeFromCart(cartItem.id)} size={20} style={{ marginTop: 30 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !address) {
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number (10 digits only).");
      return;
    }
    let items = "";
    cart.map((item) => {
      items += `${item.name} x ${item.quantity} = ${item.price} \n`;
      return null;
    });
    emailjs.init("7ln6p0Sr6aWoIbfMZ");
    emailjs.send("service_qox8408", "template_exs0xbk", {
      publicKey: '',
      name: name,
      items: items,
      totalPrice: total,
      address: address,
      phoneNumber: phoneNumber,
      reply_to: email,
      bcc_to: "trahoahac.boston@gmail.com",
    })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setIsOpenAlert(true)
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    setIsOpen(true)
    setIsOpenForm(false)
  }

  const emptyCart = () => (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3>Your Cart is Empty</h3>
        </div>
      </div>
    </div>
  );

  const checkoutButton = () => {

    return (<>
      <hr style={{ height: '1px', width: '100%' }} />
      <div className="col-md-10 mt-5"></div>
      <div className="col-md-2 mt-5">
        <div className="row justify-content-end" style={{ marginBottom: 10 }}>
          <div className="col-md-6">
            <h5>Total: </h5>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <h5>${total}</h5>
          </div>
        </div>

      </div>
      <Dialog open={isOpenForm} maxWidth="md" fullWidth onClose={handleCloseForm}>
        <DialogTitle sx={{ textAlign: 'center' }}>Phiếu điền thông tin nhận hàng</DialogTitle>
        <DialogContent dividers>
          {cart.length !== 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                    inputProps={{ style: { fontSize: '1.2rem' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                    inputProps={{ style: { fontSize: '1.2rem' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Số điện thoại"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                    inputProps={{ style: { fontSize: '1.2rem' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                    inputProps={{ style: { fontSize: '1.2rem' } }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                  <div className="col-md-12 text-center" style={{ marginTop: '2rem' }}>
                    <div className="col-md-12 text-center">
                      <button className="btn btn-custom btn-lg" onClick={handleSubmit}>Checkout</button>
                    </div >
                  </div>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <div className="col-md-12 text-center">
        <button className="btn btn-custom btn-lg" onClick={() => setIsOpenForm(true)}>Checkout</button>
      </div >
    </>)
  };

  return (
    <div className="container">

      <div className="row" style={{ marginTop: '5rem' }}>
        <div id="cart" className="container">
          {cart.length === 0 ? emptyCart() : cart.map(cartItems)}

        </div>

        {cart.length !== 0 && checkoutButton()}
      </div>
    </div>

  );
};
export default Cart;
