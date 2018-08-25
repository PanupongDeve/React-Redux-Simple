import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './RouterStore';

const generateRouter = (routes) => {
    return class Routes extends Component {
        render() {
          return (
            <Router>
              <Switch>
                {routes.map(route => (
                  <Route
                    exact
                    path={route.path}
                    key={route.name}
                    component={route.component}
                  />
                ))}
              </Switch>
            </Router>
          );
        }
      }
}

class RouterHelper {

    constructor() {
        this.routes = []
    }

    pluginRouteStore(routes) {
        this.routes = routes;
        return this;
    }

    getRoutesComponent() {
        return generateRouter(this.routes)
    }

}

export default new RouterHelper().pluginRouteStore(routes);