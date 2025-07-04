import './footer.css';

function Footer() {
  return (
    <>
        {/*---Footer---*/}
        <div className="container-fluid d-flex align-items-center" id="pie">
          <div className="row w-100">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n4"><h2>Contactos:</h2></div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n5"><a><i class="fa-solid fa-phone "></i>+546-160000</a></div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n6"><a target="_blank"><i class="fa-brands fa-facebook "></i>EduMultipro_08</a></div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n7"><a target="_blank"><i class="fa-brands fa-instagram "></i>EduMultipro_08</a></div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n8"><a target="_blank"><i class="fa-regular fa-envelope "></i>Edu_Pro@gmail.com</a></div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 col-xxl-2 d-flex justify-content-center align-items-center" id="n9"><a target="_blank"><i class="fa-solid fa-globe "></i>EduMultiPro</a></div>
          </div>
        </div>
    </>
  );
}

export default Footer;