import React, { useState, useEffect } from "react";
import styles from "../../styles/Earning/Earning.module.css";
import 'swiper/swiper-bundle.css';
import { ownerBookingAPI } from "../../api/booking";
import earnings from "../../assets/Yatch/sa-earnings.webp";

const Earnings: React.FC = () => {
    const [earningsData, setEarningsData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState('all');
    const [selectedAgent, setSelectedAgent] = useState('all');

    const bookingStatusOptions = [
        { value: 'all', label: 'All' },
        { value: 'current', label: 'Current' },
        { value: 'ongoing', label: 'Ongoing' }
    ];

    const agentOptions = [
        { value: 'all', label: 'All Agents' },
        { value: 'agent1', label: 'Agent 1' },
        { value: 'agent2', label: 'Agent 2' },
        { value: 'agent3', label: 'Agent 3' }
    ];

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                setIsLoading(true);
                // Construct query parameters
                const queryParams = new URLSearchParams();
                if (bookingStatus !== 'all') queryParams.append('status', bookingStatus);
                if (selectedAgent !== 'all') queryParams.append('agent', selectedAgent);
                // @ts-ignore
                const earnings = await ownerBookingAPI.getEarnings(queryParams.toString());
                setEarningsData(earnings);
            } catch (err: any) {
                setError(err?.message || 'Failed to fetch earnings');
                console.error("Error fetching earnings:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEarnings();
    }, [bookingStatus, selectedAgent]);

    const NoEarningsMessage = ({ type }: { type: string }) => (
        <div className={styles.noBookings}>
            <p>No {type} earnings available</p>
        </div>
    );

    const handleBookingStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBookingStatus(event.target.value);
    };

    const handleAgentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAgent(event.target.value);
    };

    return (
        <div className={styles.comp_body}>
            <div className={styles.image_box}>
                <img src={earnings} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yatchBox}>
                <div className={styles.section_head2}>My Earnings</div>
                <div className={styles.section_head}>Monitor performance, track payouts, and analyze income trends</div>
                
                <div className={styles.filterContainer}>
                    {/* <select 
                        className={styles.filterDropdown}
                        value={bookingStatus}
                        onChange={handleBookingStatusChange}
                    >
                        {bookingStatusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select> */}

                    <select 
                        className={styles.filterDropdown}
                        value={selectedAgent}
                        onChange={handleAgentChange}
                    >
                        {agentOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.earnigs_box}>
                    <div className={styles.text}>Total:</div>
                    <div className={styles.earning}>
                        {isLoading ? (
                            'Loading...'
                        ) : error ? (
                            'Error loading earnings'
                        ) : earningsData ? (
                            earningsData.total || '0'
                        ) : (
                            <NoEarningsMessage type="earnings" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Earnings;