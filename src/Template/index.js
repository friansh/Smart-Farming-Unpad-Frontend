import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Template(props) {
  return (
    <div className="wrapper">
      <Header />

      <Sidebar userName={props.userName} page={props.page} />

      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{props.title}</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">{props.children}</section>
      </div>

      <Footer />
    </div>
  );
}
