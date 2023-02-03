import Reservation from "./Reservations";
import ReactDOM from 'react-dom'
import AddProperty from "./AddProperty";
import ShowAndEditAProperty from "./ShowAndEditAProperty"
import ShowReservations from "./ShowReservations";
//<Route path="http://localhost:4000/reservations/getR/6380144d6c5cba2b008983a0" component={Reservation}/> 

function SideBar()
{
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link)=> {
    link.addEventListener("click", function(){
        links.forEach((e)=> {e.classList.remove('active')})
        this.classList.add('active')
        console.log("linkssss")
    })
})
    function renderReservations()
    {
        ReactDOM.render(<ShowReservations />, document.getElementById('root'));
    }
    function renderAddAProperty()
    {
        ReactDOM.render(<AddProperty />, document.getElementById('root'));
    }
    function showAndEditAProperty()
    {
        ReactDOM.render(<ShowAndEditAProperty/>, document.getElementById('root'));
    }
    return(
        <div>
      <a class="nav-link active" href="/">Home</a>

      <a class = " nav-link" onClick={renderReservations} > My Reservations</a>
      <div id="toBeShownOnlyToHostSideBarID" onClick={showAndEditAProperty} >
      </div>
      <div id="toBeShownOnlyToHostSideBarID2" onClick={renderAddAProperty}></div>
      </div>
    );
}
export default SideBar;