import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditSpotForm from "../EditSpotForm";

const UpdateSpotForm = () => {
  //populate spot from Redux store
  const { spotId } = useParams();
  console.log(spotId, "id from useParams inside UPDATE SPOT FORM>>>>>>>>>>>>>>")
  // using useSelector, grab spot data from useParams
  //in order to populate the form with the spot's data

  const spot = useSelector((state) => state.spots[spotId]);
  console.log(spot, "spot from useSelector inside UPDATE SPOT FORM>>>>>>>>>>>>>>")
  
  
  return (
    <EditSpotForm spot={spot} formType="Update Your Spot" />
  );
}

export default UpdateSpotForm;