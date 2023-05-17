const Footer = ({ clearBtn, total }) => {
  return (
    <>
      <footer>
        <hr />
        <div className="total-con">
          <p>Total</p>
          <p>${total}</p>
        </div>
        <button className="clear-btn" onClick={clearBtn}>
          Clear Cart
        </button>
      </footer>
    </>
  );
};

export default Footer;
