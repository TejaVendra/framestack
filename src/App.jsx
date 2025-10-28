import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Pricing from "./Pages/Pricing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ContactUs from "./Pages/Contact";
import Nav from "./Components/Nav";
import Cursor from "./Sections/Cursor";
import ServicesPage from "./Pages/ServicesPage";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ResetPassword from "./Pages/ResetPassword";
import Reset from "./Pages/Reset";
import Profile from "./Pages/Profile";
import Navigation from "./Components/Navigation";
import WebsiteRequest from "./Pages/WebsiteRequest";
import UserProjects from "./Pages/UserProjects";
import ProjectDetail from "./Pages/ProjectDetail";
import Orders from "./Pages/Orders";
import TemplateDisplay from "./Pages/TemplateDisplay";
import NotFoundPage from "./Components/NotFoundPage";
import "react-toastify/dist/ReactToastify.css";
import WorkInProgress from "./Components/WorkInProgress ";
import TermsAndConditions from "./Components/TermsAndConditions";
import PopUp from "./Sections/PopUp";
import EmailReminderPopup from "./Sections/EmailReminderPopup ";


const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <PublicRoute>
          <Nav></Nav>
         <Home></Home>
      
      </PublicRoute>
      
    </>,
  },
  {
    path: "/pricing",
    element: <>
    <PublicRoute>
       <Nav></Nav>
      <Pricing></Pricing>
  
    </PublicRoute>
     
    </>,
  },
  {
    path: "/signup",
    element: <>
      <PublicRoute>
         <Nav></Nav>
          <Signup></Signup>
         <EmailReminderPopup/>
      </PublicRoute>
     
    </>,
  },
   {
    path: "/terms-and-conditions",
    element: <>
      <PublicRoute>
         <Nav></Nav>
          <TermsAndConditions></TermsAndConditions>
         
      </PublicRoute>
     
    </>,
  },
  {
    path: "/login",
    element: <>
    <PublicRoute>
        <Nav></Nav>
      <Login></Login>
     
    </PublicRoute>
    
    </>,
  },
  {
    path: "/contact",
    element: <>
      <PublicRoute>
        <Nav></Nav>
      <ContactUs></ContactUs>
    
      </PublicRoute>
      
    </>,
  },
   {
    path: "/services",
    element: <>
    <PublicRoute>
        <Nav></Nav>
      <ServicesPage/>
   
    </PublicRoute>
    
    </>,
  },
    {

    path: "/dashboard",
    element: <>
     <PrivateRoute>
        <Dashboard/>
     
     </PrivateRoute>
      
    </>,
  },
    {
    path: "/price",
    element: <>
    <PrivateRoute>
        <Navigation/>
      <Pricing/>
     
    </PrivateRoute>
   
    </>,
  },
  {
    path: "/contact-page",
    element: <>
    <PrivateRoute>
        <Navigation/>
      <ContactUs/>
    
    </PrivateRoute>
   
    </>,
  },
  {
    path: "/reset-password/:uid/:token",
    element: <>
    <PublicRoute>
       <Reset/>
     
    </PublicRoute>
     
    </>,
  },
  {
    path: "/reset-password",
    element: <>
    <PublicRoute>
         <ResetPassword/>
  
    </PublicRoute>
   
    </>,
  },
  {
    path: "/profile",
    element: <>
   <PrivateRoute>
    <Navigation/>
      <Profile/>
     
   </PrivateRoute>
     </>,
  },
   {
    path: "/website-requests",
    element: <>
   <PrivateRoute>
    <Navigation/>
      <UserProjects/>
   
   </PrivateRoute>
     </>,
  },
    {
    path: "/project/:id",
    element: <>
   <PrivateRoute>
    <Navigation/>
      <ProjectDetail/>
     
   </PrivateRoute>
     </>,
  },
   {
    path: "/orders",
    element: <>
   <PrivateRoute>
    <Navigation/>
      <Orders/>
      
   </PrivateRoute>
     </>,
  },
   {
    path: "/templates",
    element: <>
   <PrivateRoute>
    <Navigation/>
      <TemplateDisplay/>
     
   </PrivateRoute>
     </>,
  },
   {
    path: "*",
    element: <>

      <NotFoundPage/>
     
 
     </>,
  },
   {
    path: "/chat",
    element: <>
   <PrivateRoute>
    <Navigation/>
     <WorkInProgress/>
   
   </PrivateRoute>
     </>,
  },
  
])


function App() {
    return(
        <>
          <AuthProvider>
             <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
          <PopUp/>
          <Cursor/>
          
        </>
    );
}

export default App;
