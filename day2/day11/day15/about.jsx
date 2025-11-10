import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About Amazon</h1>
            <div className="about-content">
                <section className="about-section">
                    <h2>Our Story</h2>
                    <p>Amazon.com was founded in 1994 by Jeff Bezos, starting as an online bookstore and expanding to become the world's largest e-commerce platform.</p>
                </section>

                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>To be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online.</p>
                </section>

                <section className="about-section">
                    <h2>Innovation</h2>
                    <p>We strive to innovate on behalf of our customers through our various products and services, including Prime, Alexa, AWS, and more.</p>
                </section>

                <section className="about-section">
                    <h2>Sustainability</h2>
                    <p>We are committed to building a sustainable business for our customers and the planet, aiming to be net-zero carbon by 2040.</p>
                </section>
            </div>
        </div>
    );
};

export default About;