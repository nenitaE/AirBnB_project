import "./SpotTile.css";

function SpotTile ({spot}) {
    console.log("Inside Spot Tile>>>>>>>>>>>>>>")


return (
    <div className='spot-tile'>
        <div className='spot-image'>
            <img
                className='spot-preview-image'
                src={spot.previewImage || null}
                alt={`${spot.name} images`}
                width="320" height="240"
            />
        </div>
            <div className='spot-container'>
                <div className='spot-location'>
                    <div className='location'>
                        {spot.city}, {spot.state}
                    </div>
                    <div className='spot-stars'>
                        <p className='spot-price'>
                            <div className='price'>
                                <p><b><a>${spot.price} </a></b> night</p>
                            </div>
                        </p>
                    </div>
                </div>
                    <div className='spot-data'>
                        <span className='stars'>
                                    <p className='star-icon'>&#x2605; 
                                        {Number(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'New'}
                                    </p>
                        </span>
                    </div>
                </div>
            </div>
    )

}

export default SpotTile;