import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEditSpot, fetchSpotDetails } from '../../store/spots';
import './EditSpotForm.css';

const EditSpotForm = ({ spot, formType}) => {
    console.log("Inside SpotForm component>>>>>>>>>>>>>>")
    const {spotId} = useParams();
    console.log(spotId, "spotID.....")
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");    
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();


    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);
    const updateImg1 = (e) => setImg1(e.target.value);
    const updateImg2 = (e) => setImg2(e.target.value);
    const updateImg3 = (e) => setImg3(e.target.value);
    const updateImg4 = (e) => setImg4(e.target.value);

    //url validation
    // const validImage = ["png", "jpg", "jpeg"];
    // const checkUrl = (url) => {
    //     const end = url.split(".").pop().toLowerCase();
    //     return validImage.includes(end);
    //   };

    useEffect(() => {
        const errors = [];
        if(!country.length) errors.push('Country is required');
        if(!address.length) errors.push('Address is required');
        if(!city.length) errors.push('City is required');
        if(!state.length) errors.push('State is required');
        if(!Number(lat)) errors.push('Latitude is required');
        if(!Number(lng)) errors.push('Longitude is required');
        if(!description.length) errors.push('Description is required');
        if(!name.length) errors.push('Name is required');
        if(!Number(price)) errors.push('Price is required');
        if(!previewImage) errors.push('Preview Image is required');
        setValidationErrors(errors);
    }, [country, city, address, state, lat, lng, description, name, price, previewImage])

    const handleSubmit = async (e) => {
        console.log("Inside Handle SUbmit...SpotForm component>>>>>>>>>>>>>>")
    
        e.preventDefault();
        setHasSubmitted(true);
        const imagesArr = [previewImage, img1, img2, img3, img4];
        console.log (spotId, "spot ID in edit form")
        const spot = {
                spotId,
                country,
                address, 
                city,
                state,                
                lat,
                lng,
                name,
                description,
                price,
                imagesArr 
            };
        
        let newSpot = await dispatch(fetchEditSpot(spot));
        console.log(newSpot, "newSpot details in SpotForm component----AFTER dispatching fetchCreateSpot");

        if (newSpot) {
            let spotId = newSpot.id;
            
            history.push(`/spots/${spotId}`);
            dispatch(fetchSpotDetails(spotId));
        }
        
    };
    
    return (
        <div className='create-spot-container'>
            <form className ='create-spot-form' onSubmit={handleSubmit} >   
                <h2>{formType}</h2>
                    <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they have booked a reservation.</p>                    
                                <div className='country-div'>
                                    <label htmlFor='Country'>Country</label>
                                        {hasSubmitted && !country && (
                                            <label htmlFor='Country' className='field-error'>Country is required</label>
                                        )}
                                        <input 
                                            type="text"
                                            placeholder="Country"
                                            required={true}
                                            value={country}
                                            onChange={updateCountry}
                                        />
                                 </div>
                                    <div className='address-div'>
                                        <label htmlFor='Address'>Street Address</label>
                                            {hasSubmitted && !address && (
                                                <label htmlFor='Address' className='field-error'>Address is required</label>
                                            )}
                                            <input 
                                                type="text"
                                                placeholder="Address"
                                                required={true}
                                                value={address}
                                                onChange={updateAddress}
                                            />
                                    </div>
                                        <div className='city-div'>
                                            <label htmlFor='City'>City</label>
                                                {hasSubmitted && !city && (
                                                    <label htmlFor='City' className='field-error'>City is required</label>
                                                )}
                                                <input 
                                                    type="text" 
                                                    placeholder="City"
                                                    required={true}
                                                    value={city}
                                                    onChange={updateCity}
                                                />
                                            <p>, </p>
                                            <label htmlFor='State'>State</label>
                                                {hasSubmitted && !state && (
                                                    <label htmlFor='State' className='field-error'>State is required</label>
                                                )}
                                                <input 
                                                    type="text" 
                                                    placeholder="State"
                                                    required={true}
                                                    value={state}
                                                    onChange={updateState}
                                                />
                                        </div>
                                            <div className='lat-lng-div'>
                                                <label htmlFor='Latitude'>Latitude</label>
                                                    {hasSubmitted && !lat && (
                                                        <label htmlFor='Latitude' className='field-error'>Latitude is required</label>
                                                    )}
                                                    <input 
                                                        type="text"
                                                        placeholder="Latiitude" 
                                                        required={true}
                                                        min='-180'
                                                        max='180'
                                                        value={lat}
                                                        onChange={updateLat}
                                                    />
                                                <label htmlFor='Longitude'>Longitude</label>
                                                    {hasSubmitted && !lng && (
                                                        <label htmlFor='Longitude' className='field-error'>Longitude is required</label>
                                                    )}
                                                    <input 
                                                        type="text"
                                                        placeholder="Longitude" 
                                                        required={true}
                                                        min='-180'
                                                        max='180'
                                                        value={lng}
                                                        onChange={updateLng}
                                                    />
                                            </div>
                                                <div className='description-div'>
                                                    <h3>Describe your place to guests</h3>
                                                    <p>Mention the best features of your space, any special amenitites like fast wifi or parking, and what you love about the neighborhood.</p>
                                                    <textarea 
                                                        placeholder="Please write atleast 30 characters."
                                                        required={true}
                                                        minLength='30'
                                                        value={description}
                                                        onChange={updateDescription}
                                                    />
                                                    {hasSubmitted && description.length < 30 && (
                                                        <label htmlFor='Description' className='field-error'>Description needs a minimum of 30 characters</label>
                                                    )}
                                                </div>
                                                    <div className='spot-title-div'>
                                                        <h3>Create a title for your spot</h3>
                                                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                                                        <input 
                                                            type="text"
                                                            placeholder="Name of your spot"
                                                            required={true}
                                                            value={name}
                                                            onChange={updateName}
                                                        />
                                                        {hasSubmitted && !name && (
                                                            <label htmlFor='Name' className='field-error'>Name is required</label>
                                                        )}
                                                    </div>
                                                        <div className='spot-price-div'>
                                                            <h3>Set a base price for your spot</h3>
                                                            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                                                            &#36; <input 
                                                                type="number"
                                                                placeholder="Price per night (USD)"
                                                                required={true}
                                                                value={price}
                                                                onChange={updatePrice}
                                                            />
                                                            {hasSubmitted && !price && (
                                                                <label htmlFor='Price' className='field-error'>Price is required</label>
                                                            )}
                                                        </div>
                                                            <div className='spot-photos-div'>
                                                                <h3>Liven up your spot with photos</h3>
                                                                <p>Submit a link to at least one photo to publish your spot.</p>
                                                                <input 
                                                                    type="url"
                                                                    placeholder="Preview Image URL"
                                                                    value={previewImage}
                                                                    required={true}
                                                                    // requiredpattern=".[jpg] | .[png] | .[jpeg]"
                                                                    onChange={updatePreviewImage}
                                                                />
                                                                {hasSubmitted && !previewImage && (
                                                                    <label htmlFor='Preview Image' className='field-error'>Preview image is required</label>
                                                                )}
                                                                <input 
                                                                    type="url"
                                                                    placeholder="Image URL"
                                                                    value={img1}
                                                                    onChange={updateImg1}
                                                                />
                                                                <input 
                                                                    type="url"
                                                                    placeholder="Image URL"
                                                                    value={img2}
                                                                    onChange={updateImg2}
                                                                />
                                                                <input 
                                                                    type="url"
                                                                    placeholder="Image URL"
                                                                    value={img3}
                                                                    onChange={updateImg3}
                                                                />
                                                                <input 
                                                                    type="url"
                                                                    placeholder="Image URL"
                                                                    value={img4}
                                                                    onChange={updateImg4}
                                                                />
                                                            </div>
                                    <input type="submit" value={formType} />
            </form>
        </div>
    );


}

export default EditSpotForm;