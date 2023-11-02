import Template from "../../Template";

import Pages from "../../Constants/Pages.json";

export default function Dashboard() {
  return (
    <Template userName="Fikri Rida P" title="Dashboard" page={Pages.Dashboard}>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Kosong</h3>
              </div>
              <div className="card-body">Sementara masih kosong</div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}
