import React from "react";
import { NFT } from "@type/data/nft.type";
import { convertImage } from "@helper/converter";
import Lottie from "lottie-react";
import animation from "../modal/loading.json"

export interface ProfileNFTItemProps {
    nft?: NFT
}

const ProfileNFTItem = (prop: ProfileNFTItemProps) => {
    const { nft } = prop;

    console.log('nft: ', nft)

    if (nft === undefined) {
        return (
            <div className="col-md-6 col-lg-6">
                <div className="card rounded-3 mb-5" data-aos="fade-up">
                    <div className="test-loading" style={{ zIndex: 9999 }}>
                        <div className="test-lottie">
                            <Lottie animationData={animation} style={{width: '100px', height: '100px'}} loop={true} autoplay={true}></Lottie>
                        </div>
                    </div>
                    <div className="mb-0 p-2 pb-0">
                        <span className="d-block overflow-hidden rounded-3">
                            <div  className="img-fluid" style={{height: '280px', width: "100%"}}/>
                        </span>
                    </div>
                    <div className="card-body overflow-hidden p-4 px-lg-5 flex-grow-1">
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                        <hr className="my-3"/>
                        <small className="text-body-secondary mb-2 d-block"></small>
                        <p className="mb-0"></p>
                    </div>
                </div>
            </div>
        )
    }
    else 
    return (
        <div className="col-md-6 col-lg-6">
            <div className="card rounded-3 mb-5" data-aos="fade-up">
                <div className="mb-0 p-2 pb-0">
                    <span className="d-block overflow-hidden rounded-3">
                        <img src={convertImage(nft.metadata.image)} className="img-fluid"
                            style={{height: '280px', width: "100%"}} alt=""/>
                    </span>
                </div>
                <hr className="my-3"/>
                <div className="card-body overflow-hidden p-4 px-lg-5 flex-grow-1">
                    <small className="text-body-secondary mb-2 d-block">NFT Token Id</small>
                    <p className="mb-0">#{nft.id}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Owner</small>
                    <p className="mb-0">{nft.owner.toString()}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Name</small>
                    <p className="mb-0">{nft.metadata.name}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Description</small>
                    <p className="mb-0">{nft.metadata.description}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Event Name</small>
                    <p className="mb-0">{nft.metadata.attributes.name}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Event Location</small>
                    <p className="mb-0">{nft.metadata.attributes.location}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Event Category</small>
                    <p className="mb-0">{nft.metadata.attributes.category}</p>
                    <hr className="my-3"/>
                    <small className="text-body-secondary mb-2 d-block">NFT Event Price</small>
                    <p className="mb-0">{nft.metadata.attributes.price}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileNFTItem;