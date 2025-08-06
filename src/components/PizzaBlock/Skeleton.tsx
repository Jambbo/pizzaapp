// import React from 'react';
// import ContentLoader from 'react-content-loader';
//
// export const Skeleton = () => (
//     <ContentLoader
//         className="pizza-block"
//         speed={2}
//         width={280}
//         height={500}
//         viewBox="0 0 280 500"
//         backgroundColor="#f3f3f3"
//         foregroundColor="#ecebeb">
//         <circle cx="134" cy="136" r="125" />
//         <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
//         <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
//         <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
//         <rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
//     </ContentLoader>
// );

import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton:React.FC = () => (
    <div className="pizza-block">
            <ContentLoader
                speed={2}
                width={280}
                height={465}
                viewBox="0 0 280 465"
                backgroundColor="#f5cc94"
                foregroundColor="#ecebeb"
            >
                    <circle cx="464" cy="190" r="42"/>
                    <rect x="0" y="1" rx="0" ry="0" width="270" height="250"/>
                    <rect x="0" y="305" rx="11" ry="11" width="280" height="86"/>
                    <rect x="69" y="265" rx="9" ry="9" width="140" height="20"/>
                    <rect x="8" y="425" rx="0" ry="0" width="92" height="30"/>
                    <rect x="177" y="415" rx="21" ry="21" width="100" height="45"/>
            </ContentLoader>
    </div>
)