import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Route } from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import Register from "./pages/register/index";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {/* <Resource name="posts" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} /> */}
    <CustomRoutes noLayout>
      <Route path="/register" element={<Register />} />
    </CustomRoutes>    
  </Admin>
);
