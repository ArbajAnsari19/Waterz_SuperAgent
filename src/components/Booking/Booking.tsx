import React, { useState, useEffect } from "react";
import styles from "../../styles/Booking/Booking.module.css";
import Y1 from "../../assets/Yatch/Y1.svg";
import Y2 from "../../assets/Yatch/Y2.svg";
import BookedCard from "../Layouts/BookedCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { superagentAPI } from "../../api/superagent";
import { useAppSelector } from "../../redux/store/hook";
import { IAgent } from "../../types/agent";

interface Yacht {
    _id: string;
    name: string;
    capacity: number;
    price: {
        sailing: number;
        still: number;
    };
    images: string[];
    location: string | {
        type: string;
        coordinates: number[];
    };
    description: string;
    amenities: string[];
    crews: Array<{
        name: string;
        role: string;
        _id: string;
    }>;
}

const Booking: React.FC = () => {
    const [currentBookings, setCurrentBookings] = useState<Yacht[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookingStatus, setBookingStatus] = useState('all');
    const [selectedAgent, setSelectedAgent] = useState('all');
    const [agents, setAgents] = useState<IAgent[]>([]);

    // Get agents from redux store
    const { allAgents } = useAppSelector((state) => state.agent);

    const bookingStatusOptions = [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Upcoming' },
        { value: 'completed', label: 'Completed' }
    ];

    // Use agents from Redux or fetch if not available
    useEffect(() => {
        if (allAgents.length > 0) {
            setAgents(allAgents);
        } else {
            const fetchAgents = async () => {
                try {
                    const response = await superagentAPI.getAllAgents();
                    if (response.allAgents) {
                        setAgents(response.allAgents);
                    }
                } catch (err) {
                    console.error("Error fetching agents:", err);
                }
            };
            fetchAgents();
        }
    }, [allAgents]);

    // Generate agent options dynamically
    const agentOptions = [
        { value: 'all', label: 'All Agents' },
        ...agents.map(agent => ({
            value: agent.id,
            label: agent.name
        }))
    ];

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Create filter object for body params
                const filterParams: { status?: string; agentWise?: string } = {};
                if (bookingStatus !== 'all') {
                    filterParams.status = bookingStatus;
                }
                if (selectedAgent !== 'all') {
                    filterParams.agentWise = selectedAgent;
                }

                const response = await superagentAPI.getBookings(filterParams);
                setCurrentBookings(response || []);
            } catch (err: any) {
                setError(err?.message || 'Failed to fetch bookings');
                console.error("Error fetching bookings:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [bookingStatus, selectedAgent]);

    const NoBookingsMessage = ({ type }: { type: string }) => (
        <div className={styles.noBookings}>
            <p>No {type} bookings available</p>
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
                <img src={Y2} alt="Yacht" className={styles.Y2} />
            </div>
            <div className={styles.yatchBox}>
                <div className={styles.section_head2}>The Bookings</div>
                <div className={styles.section_head}>
                    Track upcoming, ongoing, and completed bookings by Agents
                </div>
                
                <div className={styles.filterContainer}>
                    <select 
                        className={styles.filterDropdown}
                        value={bookingStatus}
                        onChange={handleBookingStatusChange}
                    >
                        {bookingStatusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

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

                <div className={styles.yatch_slider}>
                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : currentBookings.length === 0 ? (
                        <NoBookingsMessage type="current" />
                    ) : (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3.2}
                            pagination={{ clickable: true }}
                            style={{ padding: "20px 0", width: "100%" }}
                        >
                            {currentBookings.map((booking) => (
                                <SwiperSlide key={booking._id}>
                                    <BookedCard
                                        name={booking.name}
                                        capacity={booking.capacity}
                                        startingPrice={booking.price.sailing.toString()}
                                        imageUrl={booking.images[0] || Y1}
                                        yachtId={booking._id}
                                        isPrev={false}
                                        yacht={booking}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;