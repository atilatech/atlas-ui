import React, { useEffect, useState } from 'react';
import { UserProfile as UserProfileClass } from '../../models/UserProfile';
import Environment from '../../services/Environment';
import { UserProfileService } from '../../services/UserProfileService';
import { Utils } from '../../services/Utils';



function UserProfileView() {
    const [userProfile, setUserProfile] = useState<UserProfileClass>();


    useEffect(() => {
        // declare the async data fetching function
        const fetchUser = async () => {
            const parsedToken = Utils.parseJwt(localStorage.getItem('token')!);
            console.log({parsedToken});
      
      
            const {data} = await UserProfileService.getUserProfile(parsedToken.userprofile_id);
            console.log({data});
      
            setUserProfile(data);
        }
      
        // call the function
        fetchUser()
          // make sure to catch any error
          .catch(console.error);;
      }, []);
    

    return (
        <div className="Atlas container card shadow my-5 p-5">
            {userProfile && 
            <div>
                <p className='col-12'>
                    Email: {userProfile.user.email}
                </p>
                <p className='col-12'>
                    Username: {userProfile.user.username}
                </p>
                <p className='col-12'>
                    Atlas Searches: {userProfile.atlas_searches}
                </p>
                <p className='col-12'>
                    Account Type: {userProfile.is_premium ? 'Premiun': 'Basic'}
                </p>
                Free accounts are limited to 20 searches. Upgrade to premium to get unlimited searches.
                {!userProfile.is_premium && 
                    <button className='btn btn-link'>
                        <a href={Environment.stripePaymentsLink} target='_blank'>
                            Upgrade to Premium{' '}($9/month)
                        </a>
                    </button>
                }
            </div>
            
            }
        </div>
        
    );
};

export default UserProfileView;