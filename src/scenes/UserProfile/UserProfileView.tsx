import React, { useEffect, useState } from 'react';
import { UserProfile as UserProfileClass } from '../../models/UserProfile';
import Environment from '../../services/Environment';
import { UserProfileService } from '../../services/UserProfileService';
import { Utils } from '../../services/Utils';
import ApplyCredits from '../Atlas/ApplyCredits';



function UserProfileView() {
    const [userProfile, setUserProfile] = useState<UserProfileClass>();


    useEffect(() => {
        // declare the async data fetching function
        const fetchUser = async () => {
            const parsedToken = Utils.parseJwt(localStorage.getItem('token')!);
      
            const {data} = await UserProfileService.getUserProfile(parsedToken.userprofile_id);
      
            setUserProfile(data);
        }
      
        // call the function
        fetchUser()
          // make sure to catch any error
          .catch(console.error);;
      }, []);
    

    return (
        <div>
            {userProfile && 
            <div className="Atlas container card shadow my-5 p-5">

                <p className='col-12'>
                    Email: {userProfile.user.email}
                </p>
                <p className='col-12'>
                    Username: {userProfile.user.username}
                </p>
                <p className='col-12'>
                    Atlas Credits: {userProfile.atlas_credits}{' '}

                    (<a href={Environment.stripePaymentsLink} target='_blank' rel='noreferrer'>
                            Buy More Credits
                        </a>)

                        {Environment.name !== "prod" &&
                            <p className="my-3">
                                You can use a test credit card: 4000001240000000
                                <br/>
                                Use with any security code and future expiry date.
                                <br/>
                                <a href='https://docs.stripe.com/testing#cards' target='_blank' rel='noreferrer'>
                                    More information: Strip Docs - Card Testing
                                </a>
                            </p>
                            }
                </p>

            </div>
            }

            <ApplyCredits />
        </div>
        
    );
};

export default UserProfileView;