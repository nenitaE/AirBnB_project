import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCreateSpot, fetchSpotDetails } from '../../store/spots';
import './SpotForm.css';

const SpotForm = ({ formType}) => {
    console.log("Inside SpotForm component>>>>>>>>>>>>>>")
    
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');    
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageA, setImageA] = useState('');
    const [imageB, setImageB] = useState('');
    const [imageC, setImageC] = useState('');
    const [imageD, setImageD] = useState('');
    const [imageE, setImageE] = useState('');
    const [errors, setErrors] = useState([]);
    
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors([]);
        let errorsArr = [];

        if(!country.length){
            errorsArr.push('Country is required')
        }
        if(!address.length){
            errorsArr.push('Address is required')
        }
        if(!city.length){
            errorsArr.push('City is required')
        }
        if(!state.length){
            errorsArr.push('State is required')
        }
        if(!lat.length){
            errorsArr.push('Latitude is required')
        }
        if(!lng.length){
            errorsArr.push('Longitude is required')
        }
        if(description.length < 30){
            errorsArr.push('Description needs a minimum of 30 characters')
        }
        if(!name.length){
            errorsArr.push('Name is required')
        }
        if(!price.length || price === 0){
            errorsArr.push('Price is required')
        }
        if(!imageA.length){
            errorsArr.push('Preview image is required')
        }

        setErrors(errorsArr)

        if(errorsArr.length){
            return errors
        }

        const spot = { 
                address, 
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
                images: [imageA, imageB, imageC, imageD, imageE] 
            };
        
        let newSpot = await dispatch(fetchCreateSpot(spot));
        console.log(newSpot, "newSpot details in SpotForm component----AFTER dispatching fetchCreateSpot")
        console.log("SpotForm component----AFTER dispatching fetchCreateSpot")

        if (newSpot) {
            let spotId = newSpot.id;
            
            history.push(`/spots/${newSpot.id}`);
            dispatch(fetchSpotDetails(spotId));
        }
        
    };
    
    return (
        <div className='create-spot-container'>
            <h2>Create a New Spot</h2>
                {errors.map(error => <div className='error-box' key={error}>{error}</div>)}
                    <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they have booked a reservation.</p>
                            <form className ='create-spot-form' onSubmit={handleSubmit} >                           
                                    <div className='country-div'>
                                        <label>
                                        Country
                                        <input 
                                            type="text"
                                            placeholder="Country"
                                            value={country}
                                            onChange={e => setCountry(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='address-div'>
                                    <label>
                                        Street Address
                                        <input 
                                            type="text"
                                            placeholder="Address"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='city-div'>
                                    <label>
                                        City
                                        <input 
                                            type="text" 
                                            placeholder="City"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                        />
                                    </label>
                                    <p>, </p>
                                    <label>
                                        State
                                        <input 
                                            type="text" 
                                            placeholder="State"
                                            value={state}
                                            onChange={e => setState(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='lat-lng-div'>
                                    <label>
                                        Latitude
                                        <input 
                                            type="text"
                                            placeholder="Latiitude" 
                                            value={lat}
                                            onChange={e => setLat(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Longitude
                                        <input 
                                            type="text"
                                            placeholder="Longitude" 
                                            value={lng}
                                            onChange={e => setLng(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='description-div'>
                                    <label>
                                        <h3>Describe your place to guests</h3>
                                        <p>Mention the best features of your space, any special amenitites like fast wifi or parking, and what you love about the neighborhood.</p>
                                        <textarea 
                                            placeholder="Description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='spot-title-div'>
                                    <label>
                                        <h3>Create a title for your spot</h3>
                                        <input 
                                            type="text"
                                            placeholder="Name of your spot"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='spot-price-div'>
                                    <label>
                                        <h3>Set a base price for your spot</h3>
                                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                                        &#36; <input 
                                            type="number"
                                            placeholder="Price per night (USD)"
                                            value={price}
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </label>
                                    </div>
                                    <div className='spot-photos-div'>
                                    <label>
                                        <h3>Liven up your spot with photos</h3>
                                        <p>Submit a link to at least one photo to publish your spot.</p>
                                        <input 
                                            type="text"
                                            placeholder="Preview Image URL"
                                            value={imageA}
                                            onChange={e => setImageA(e.target.value)}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image URL"
                                            value={imageB}
                                            onChange={e => setImageB(e.target.value)}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image URL"
                                            value={imageC}
                                            onChange={e => setImageC(e.target.value)}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image URL"
                                            value={imageC}
                                            onChange={e => setImageC(e.target.value)}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image URL"
                                            value={imageD}
                                            onChange={e => setImageD(e.target.value)}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image URL"
                                            value={imageE}
                                            onChange={e => setImageE(e.target.value)}
                                        />
                                    </label>
                                    </div>
                            <input type="submit" value={formType} />
                            </form>
                    </div>
      );


}

export default SpotForm;