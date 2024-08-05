import "@scss/checkout.scss";
import { StoreType } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { numberToVND } from "@/utils/toVND";
import axios from "axios";
import { useEffect } from "react";
import { userAction } from "@/stores/slices/user.slice";

export default function Checkout() {
  const userStore = useSelector((store: StoreType) => store.userStore);
  const dispatch = useDispatch();

  const products = userStore.data?.cart;

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(
        `http://localhost:3000/users/${userStore.data?.id}`
      );
      dispatch(
        userAction.setUser({ ...userStore.data, cart: response.data.cart })
      );
    };
    fetchCart();
  }, []);

  const handleTotal = () => {
    let total = 0;
    products?.forEach((item: any) => {
      // Add type annotation for 'item'
      total += item.price * item.quantity;
    });
    return total;
  };
  console.log("aa", userStore.data?.receipts);

  const handleSubCheckOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const email = (
      document.getElementById("checkout-email") as HTMLInputElement
    )?.value;
    const phone = (
      document.getElementById("checkout-phone") as HTMLInputElement
    )?.value;
    const name = (document.getElementById("checkout-name") as HTMLInputElement)
      ?.value;
    const address = (
      document.getElementById("checkout-address") as HTMLInputElement
    )?.value;
    const city = (document.getElementById("checkout-city") as HTMLInputElement)
      ?.value;
    const country = (
      document.getElementById("checkout-country") as HTMLInputElement
    )?.value;
    const postal = (
      document.getElementById("checkout-postal") as HTMLInputElement
    )?.value;

    const data = {
      email,
      phone,
      name,
      address,
      city,
      country,
      postal,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/users/${userStore.data?.id}/receipts`,
        data
      );

      // Update the userStore with the new receipts data
      dispatch(
        userAction.setUser({
          ...userStore.data,
          receipts: userStore.data?.receipts
            ? [...userStore.data.receipts, response.data]
            : [response.data],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header>
        <h3>Checkout</h3>
      </header>
      <main>
        <section className="checkout-form">
          <form onClick={handleSubCheckOut}>
            <h6>Contact information</h6>
            <div className="form-control">
              <label htmlFor="checkout-email">E-mail</label>
              <div>
                <span className="fa fa-envelope" />
                <input
                  type="email"
                  id="checkout-email"
                  name="checkout-email"
                  placeholder="Enter your email..."
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="checkout-phone">Phone</label>
              <div>
                <span className="fa fa-phone" />
                <input
                  type="tel"
                  name="checkout-phone"
                  id="checkout-phone"
                  placeholder="Enter you phone..."
                />
              </div>
            </div>
            <br />
            <h6>Shipping address</h6>
            <div className="form-control">
              <label htmlFor="checkout-name">Full name</label>
              <div>
                <span className="fa fa-user-circle" />
                <input
                  type="text"
                  id="checkout-name"
                  name="checkout-name"
                  placeholder="Enter you name..."
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="checkout-address">Address</label>
              <div>
                <span className="fa fa-home" />
                <input
                  type="text"
                  name="checkout-address"
                  id="checkout-address"
                  placeholder="Your address..."
                />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="checkout-city">City</label>
              <div>
                <span className="fa fa-building" />
                <input
                  type="text"
                  name="checkout-city"
                  id="checkout-city"
                  placeholder="Your city..."
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="checkout-country">Country</label>
                <div>
                  <span className="fa fa-globe" />
                  <input
                    type="text"
                    name="checkout-country"
                    id="checkout-country"
                    placeholder="Your country..."
                    list="country-list"
                  />
                  <datalist id="country-list">
                    <option value="India" />
                    <option value="USA" />
                    <option value="Russia" />
                    <option value="Japan" />
                    <option value="Viet Nam" />
                  </datalist>
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="checkout-postal">Postal code</label>
                <div>
                  <span className="fa fa-archive" />
                  <input
                    type="numeric"
                    name="checkout-postal"
                    id="checkout-postal"
                    placeholder="Your postal code..."
                  />
                </div>
              </div>
            </div>
            <div className="form-control checkbox-control">
              <input
                type="checkbox"
                name="checkout-checkbox"
                id="checkout-checkbox"
              />
              <label htmlFor="checkout-checkbox">
                Save this information for next time
              </label>
            </div>
            <div className="form-control-btn">
              <button type="submit">Check out</button>
            </div>
          </form>
        </section>
        <section className="checkout-details">
          <div className="checkout-details-inner">
            <div className="checkout-lists">
              {products?.map((product) => {
                return (
                  <div className="card" key={Date.now() * Math.random()}>
                    <div className="card-image">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="card-details">
                      <div className="card-name">{product.name}</div>
                      <div className="card-price">
                        {numberToVND(product.price)}
                      </div>
                      <div className="card-wheel">
                        <span>Quantity: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="checkout-total">
              <h6>Total</h6>
              <p> {numberToVND(handleTotal())}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
