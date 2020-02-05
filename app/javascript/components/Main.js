import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import ItemIndex from "./ItemIndex";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { Octicon, Octicons } from "octicons-react";

function Main(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const requestCategories = async () => {
      const response = await fetch("/api/categories");
      const { data } = await response.json();
      setCategories(data);
    };
    requestCategories();
  }, [props]);

  return (
    <div>
      <nav class="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2">
              <span class="navbar-brand">
                <Octicon icon={Octicons.checklist} className="text-white" scale={3.5} />
              </span>
            </div>
            <div class="col-md-10">
              <span class="navbar-brand">
                <h3>CheckMark</h3><h4 class="small">Task Management Application</h4></span>
            </div>
          </div>
        </div>
      </nav>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h3 class="featurette"><strong>Categories</strong></h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Link to="add" className="btn btn-outline-secondary btn-sm">
              New Category <Octicon icon={Octicons.diff} scale={1.2} className="align-text-bottom" />
            </Link>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div class="col-md-6">
            <table class="table table-hover">
              {categories.map(category =>
                <tr>
                  <td>
                    <div class="row">
                      <div class="col-md-6 navbar-brand">
                        <strong>{category.attributes.title}</strong>
                      </div>
                      <div class="col-md-5">
                        <Link className="btn btn-outline-secondary mr-1" to={"category/" + category.id}>
                          <Octicon icon={Octicons.listUnordered} className="align-baseline" />
                        </Link>{" "}
                        <Link className="btn btn-outline-secondary mr-1" to={"edit/" + category.id}>
                          <Octicon icon={Octicons.tools} className="align-baseline" />
                        </Link>{" "}
                        <Link className="btn btn-outline-secondary mr-1" to={"delete/" + category.id}>
                          <Octicon icon={Octicons.trashcan} className="align-baseline" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </table>
          </div>
          <div class="col-md-6">
            <Router>
              <AddCategory path="add" />
              <EditCategory path="edit/:categoryId" />
              <DeleteCategory path="delete/:categoryId" />
            </Router>
          </div>
        </div>
        <hr class="divider"></hr>
        <Router primary={false}>
          <ItemIndex path="category/:categoryId/*" />
        </Router>
      </div>
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div class="container-fluid">
          <div class="d-flex bd-highlight justify-content-between">
            <span class="text-muted text-center small">
              <a class="nonunderline" href="https://github.com/kennyhw/cvwo2020">Maintained on <Octicon icon={Octicons.logoGithub} className="align-bottom" />{" "}
                <Octicon icon={Octicons.markGithub} className="align-bottom" /> </a>| Made for
              CVWO2020 Assignment
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Main;