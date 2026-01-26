import React, { useEffect } from 'react';

/**
 * AdSense Component for displaying ads on public content pages
 * Only display on pages with substantial original content (200+ words)
 * Should NOT be used on:
 * - Protected/user dashboard pages
 * - Login/Signup pages
 * - Pages under construction
 * - Navigation-only pages
 */
export const HorizontalAd = ({ slot = "1498043097" }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense error:', e);
        }
    }, []);

    return (
        <div className="my-6 flex justify-center">
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                data-ad-client="ca-pub-9954652290347538"
                data-ad-slot={slot}
                data-ad-format="horizontal"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export const VerticalAd = ({ slot = "5802134089" }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense error:', e);
        }
    }, []);

    return (
        <div className="my-6 flex justify-center">
            <ins
                className="adsbygoogle"
                style={{
                    display: 'inline-block',
                    width: '300px',
                    height: '250px',
                }}
                data-ad-client="ca-pub-9954652290347538"
                data-ad-slot={slot}
            ></ins>
        </div>
    );
};

export const ResponsiveAd = ({ slot = "1498043097" }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.log('AdSense error:', e);
        }
    }, []);

    return (
        <div className="my-6 flex justify-center">
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                }}
                data-ad-client="ca-pub-9954652290347538"
                data-ad-slot={slot}
                data-ad-format="autorelaxed"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default HorizontalAd;
