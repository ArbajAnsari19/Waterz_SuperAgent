import React from "react";
import styles from "../../styles/YachtDetails/YachtDetails.module.css";
import Y2 from "../../assets/Yatch/Y2.svg";
import { useLocation } from "react-router-dom";

const YachtDetails: React.FC = () => {
    const location = useLocation();
    const { yacht, isPrev } = location.state || {};

    if (!yacht) {
        return <div>No yacht details available</div>;
    }

    return (
        <div className={styles.comp_body}>
            <div className={styles.yatchBox}>
                <div className={styles.section_head}>{yacht.name}</div>
                <div className={styles.section_head2}>Explore options to craft a unique yachting experience. </div>
            </div>
            <div className={styles.image_box}>
                <img src={yacht.images[0] || Y2} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yacht_details_box}>
                <div className={styles.details}>
                    <div className={styles.prices}>
                        <div className={styles.left}>
                            <div className={styles.price_head}>Prices</div>
                            <div className={styles.price_box}>
                                <div className={styles.pricess}>
                                    <div className={styles.price_type}>Sailing Price</div>
                                    <div className={styles.price_value}>₹{yacht.price.sailing} per hour</div>
                                </div>
                                <div className={styles.pricess2}>
                                    <div className={styles.price_type}>Still Price</div>
                                    <div className={styles.price_value}>₹{yacht.price.still} per hour</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.about}>
                        <h3>About {yacht.name}</h3>
                        <p>{yacht.description}</p>
                    </div>
                    <div className={styles.summary}>
                        <h3>Summary</h3>
                        <p><b>Ideal for:</b> Friends, Family, Couples, Groups, Tourists</p>
                        <p><b>For:</b> {yacht.capacity} people</p>
                        <p><b>Where:</b> {yacht.pickupat}</p>
                        <p><b>Duration:</b> According to preference</p>
                        <p><b>Note:</b> This is an exclusive private sailing experience where the entire yacht is reserved just for you—whether you are a couple or a group of five, the price remains the same.</p>
                    </div>
                    <div className={styles.schedule}>
                        <h3>Sailing Schedule</h3>
                        <ul>
                            <li>
                                <b>15 Minutes:</b> Arrive at the designated starting point as per location as instructed by the
                                captain. Safety instructions prior to departure.
                            </li>
                            <li>
                                <b>15 Minutes:</b> The yacht journey is anchored away from the shore. You'll be taken to a serene
                                natural spot.
                            </li>
                            <li>
                                <b>15 Minutes:</b> Conclude your journey with a scenic return yacht ride back to the shore.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.specifications}>
                        <h3>Specifications</h3>
                        <p><b>Length:</b> {yacht.dimension}</p>
                        <p><b>Passenger Capacity:</b> {yacht.capacity} people</p>
                        <p><b>Crew:</b> {yacht.crews.length}</p>
                    </div>
                    <div className={styles.meetingPoint}>
                        <h3>Meeting Point Address</h3>
                        <p>{yacht.pickupat}</p>
                    </div>
                    <div className={styles.guidelines}>
                        <h3>Important Guidelines</h3>
                        <ul>
                            <li><b>Swimming Not Required:</b> Life jackets are provided, so swimming skills are not mandatory.</li>
                            <li><b>Weather Preparedness:</b> Sailing depends on wind, tides, and clear conditions, which may cause slight schedule and route changes.</li>
                            <li><b>Advisory Cancellations:</b> Trips from Gateway of India can be canceled by authorities; pre-payment is refundable or re-scheduled.</li>
                            <li><b>Stop Policy:</b> Wind-up time is included in your tour time.</li>
                            <li><b>Respect Policy:</b> Weather changes during the trip may need your cooperation.</li>
                        </ul>
                    </div>
                    <div className={styles.faqs}>
                        <h3>FAQs</h3>
                        <p><b>Do you provide catering or food on the boat?</b><br />No, we provide snacks and soft drinks without other personal requests. You are allowed to carry your own food and soft drinks or water. (We recommend sweet yogurt as a complimentary by Goa).</p>
                        <p><b>Can I add decorations like balloons, or cake on board?</b><br />Yes. All private yacht decorations can be directly availed.</p>
                        <p><b>Can you make special arrangements for birthdays/anniversaries?</b><br />Yes. We have an optional arrangement service. Make sure you confirm answers early by contacting our staff.</p>
                        <p><b>Is it a fixed location tour and will I describe the tour on my own?</b><br />Yes. It is included and can be based on healthy weather discovery material that you may want to try!</p>
                    </div>
                    <div className={styles.cancellation}>
                        <h3>Cancellation & Refund Policy</h3>
                        <p><b>Private Cancellations:</b> A refund is allowed if the booking is canceled due to unforeseeable weather, technical issues, or security protocols.</p>
                        <p><b>Customer Cancellations:</b> No refunds will be provided for cancellations made by the customer.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YachtDetails;