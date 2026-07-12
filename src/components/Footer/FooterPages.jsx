import "../../css/FooterPages.css";

const PageWrapper = ({ title, children }) => {
  return (
    <div className="footer-page-wrapper">
      <div className="container">
        <div className="footer-page-card">
          <h1 className="footer-page-title">{title}</h1>
          <div className="footer-page-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

// ABOUT

export const About = () => {
  return (
    <PageWrapper title="About Glomo">
      <p>
        Glomo is a modern online shopping platform designed to make fashion,
        electronics, home essentials, and daily shopping simple, affordable, and
        convenient for everyone.
      </p>

      <p>
        Our mission is to connect customers with quality products, trusted
        sellers, secure payments, and smooth delivery experiences — all in one
        place.
      </p>

      <p>
        We focus on customer satisfaction, reliable order management, easy
        returns, modern product discovery, and a seller-friendly marketplace
        ecosystem.
      </p>

      <p>
        Whether you are shopping for your family or growing your business as a
        seller, ShopEase aims to deliver a fast, secure, and enjoyable
        e-commerce experience.
      </p>
    </PageWrapper>
  );
};

// CAREERS

export const Careers = () => {
  return (
    <PageWrapper title="Careers">
      <p>
        At Glomo, we are building a modern e-commerce platform focused on
        customers, sellers, and smart digital shopping experiences.
      </p>

      <p>
        We are always looking for passionate people in software development,
        UI/UX design, operations, customer support, logistics, and digital
        marketing.
      </p>

      <p>
        If you enjoy solving real-world problems, building useful products, and
        working on growing digital platforms, we would love to hear from you.
      </p>

      <p>
        To apply, send your resume and portfolio to:
        <strong> careers@glomo.com</strong>
      </p>
    </PageWrapper>
  );
};

// CONTACT

export const Contact = () => {
  return (
    <PageWrapper title="Contact Us">
      <p>
        If you need help with orders, payments, returns, account issues, or
        seller onboarding, our support team is here to help.
      </p>

      <p>
        <strong>Email:</strong> support@glomo.com
      </p>

      <p>
        <strong>Phone:</strong> +91 9505700451{" "}
      </p>

      <p>
        <strong>Working Hours:</strong> Monday to Saturday, 9:00 AM – 7:00 PM
      </p>

      <p>
        <strong>Address:</strong> Glomo Support Center, Kurnool, India
      </p>

      <p>
        For business partnership or seller onboarding queries, please contact:
        <strong> business@glomo.com</strong>
      </p>
    </PageWrapper>
  );
};

//  PRESS

export const Press = () => {
  return (
    <PageWrapper title="Press Releases">
      <p>
        Glomo regularly introduces new shopping features, seller tools, and
        customer-focused improvements to deliver a better online shopping
        experience.
      </p>

      <p>
        Our recent updates include better product discovery, secure checkout,
        improved seller onboarding, streamlined returns, and smarter order
        tracking.
      </p>

      <p>
        For media inquiries, interviews, or brand collaborations, please reach
        out to <strong>media@glomo.com</strong>.
      </p>
    </PageWrapper>
  );
};

// RETURNS

export const Returns = () => {
  return (
    <PageWrapper title="Returns Centre">
      <p>
        We want you to shop with confidence. If a product arrives damaged,
        incorrect, or does not meet expectations, you can request a return based
        on that product’s return eligibility.
      </p>

      <p>To request a return:</p>

      <ul>
        <li>
          Go to <strong>Your Orders</strong>
        </li>
        <li>Select the product you want to return</li>
        <li>Choose the reason for return</li>
        <li>Submit the request</li>
      </ul>

      <p>
        Once approved, refunds are processed back to the original payment method
        within the standard refund timeline.
      </p>
    </PageWrapper>
  );
};

//   SHIPPING

export const Shipping = () => {
  return (
    <PageWrapper title="Shipping Information">
      <p>
        Glomo works with trusted delivery partners to ensure your orders reach
        you quickly and safely.
      </p>

      <p>
        Delivery time depends on seller location, product availability, and your
        shipping address.
      </p>

      <ul>
        <li>
          <strong>Standard Delivery:</strong> 3–7 business days
        </li>
        <li>
          <strong>Express Delivery:</strong> Available on selected products
        </li>
        <li>
          <strong>Order Tracking:</strong> Available from your orders page
        </li>
      </ul>

      <p>
        Any applicable shipping charges are clearly shown during checkout before
        payment confirmation.
      </p>
    </PageWrapper>
  );
};

// FAQ

export const FAQ = () => {
  return (
    <PageWrapper title="Frequently Asked Questions">
      <div className="faq-block">
        <h5>1. How do I place an order?</h5>
        <p>
          Add products to cart, proceed to checkout, enter delivery details,
          choose payment method, and place the order.
        </p>
      </div>

      <div className="faq-block">
        <h5>2. Can I cancel my order?</h5>
        <p>
          Yes, eligible orders can be cancelled before shipment from the orders
          page.
        </p>
      </div>

      <div className="faq-block">
        <h5>3. How do refunds work?</h5>
        <p>
          After a successful return or cancellation, the refund is processed to
          the original payment method.
        </p>
      </div>

      <div className="faq-block">
        <h5>4. How do I become a seller?</h5>
        <p>
          You can register from the <strong>Become a Seller</strong> page and
          complete the onboarding process.
        </p>
      </div>
    </PageWrapper>
  );
};

// ADVERTISE

export const Advertise = () => {
  return (
    <PageWrapper title="Advertise Products">
      <p>
        Glomo helps sellers and brands improve product visibility through
        homepage placements, featured sections, category campaigns, and offer
        promotions.
      </p>

      <p>Advertising opportunities may include:</p>

      <ul>
        <li>Homepage featured banners</li>
        <li>Category spotlight promotions</li>
        <li>Deal campaign placements</li>
        <li>Seasonal sale highlights</li>
      </ul>

      <p>
        For advertising and partnership opportunities, contact:
        <strong> ads@glomo.com</strong>
      </p>
    </PageWrapper>
  );
};

// 404 PAGE

export const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="container">
        <div className="notfound-card">
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <p>
            Sorry, the page you are looking for does not exist or may have been
            moved.
          </p>
        </div>
      </div>
    </div>
  );
};
