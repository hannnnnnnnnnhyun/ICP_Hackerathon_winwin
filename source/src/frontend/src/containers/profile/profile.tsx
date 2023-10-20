import React, { useEffect } from 'react';
import ShapeComponent from '@container/common/shape';
import { RootState } from '@reducer/root.reducer';
import { useSelector } from 'react-redux';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ProfileNFTItem from '@container/profile/profile.nft';
import ProfileBalance from '@container/profile/profile.balance';
import { NFTActor } from '@actor/nft.actor';
import { Principal } from '@dfinity/principal';

const ProfileContainer = () => {
    const { principal, nftBalance, tokenBalance } = useSelector((root: RootState) => root.HeaderReducer);
    const [page, setPage] = React.useState(1);
    const [nfts, setNfts] = React.useState([]);

    const getNFT = async () => {
        if (!principal) return;

        const actor = await NFTActor.getNFTActor();
        const tokenIds = await actor.getTokenIdByOwner(Principal.fromText(principal));

        const tempNFT = [];

        for (let i = nfts.length; i < (5 * page > tokenIds.length ? tokenIds.length : 5 * page); i++) {
            tempNFT.push(undefined);
            setNfts(tempNFT);
        }

        for (let i = 5 * (page - 1); i < (5 * page > tokenIds.length ? tokenIds.length : 5 * page); i++) {
            if (tokenIds[i]) {
                const nft = await actor.getTokenId(tokenIds[i]);
                const temp = [...nfts];
                temp[i] = nft[0];
                setNfts(temp);
            }
        }
    }

    useEffect(() => {
        getNFT();
    }, [page, nftBalance])


    if (!principal && !nftBalance && !tokenBalance)
        return (
            <div className="spinner-loader bg-primary text-white">
                <div className="spinner-grow" role="status">
                </div>
                <span className="small d-block ms-2">Loading...</span>
            </div>
        );
    else 
        return (
            <main>
                    <section className="bg-gradient-blur d-flex w-100 position-relative">
                        <div className="container px-xl-7 pt-12 pt-lg-15 position-relative">
                            <div className="row align-items-end">
                                <div className="d-flex align-items-center mb-3 col-lg-auto">
                                    <img src={"/assets/img/logo/icp.png"} className="width-8x rounded-2 h-auto me-3 flex-shrink-0" alt=""/>
                                    <h4 className="text-center col-lg-auto text-lg-start" style={{marginBottom: 0}}>{principal}</h4>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="overflow-hidden position-relative">
                        <div className="container px-xl-7 py-9 pt-lg-12 position-relative">
                            <div className="row">
                                <div className="col-lg-8 mx-auto">
                                    <div className="d-flex flex-column flex-md-row align-items-md-end">
                                        <div className="flex-grow-1">
                                            <h2 className="display-5">NFTs</h2>
                                        </div>
                                    </div>
                                    <hr className="mb-2 mb-lg-5"/>
                                    {
                                        nftBalance === '0' &&
                                        <div className={"h-100 w-100 text-center position-relative align-items-center align-content-center flex-center"}>
                                            <SentimentVeryDissatisfiedIcon className={"me-2"}/>
                                            보유하고 있는 NFT가 없습니다.
                                        </div>
                                    }
                                    <div className="row">
                                        {
                                            nfts.map((nft, index) => <ProfileNFTItem key={index} nft={nft}/>)
                                        }
                                        {
                                            nftBalance !== '0' &&
                                            <div className="pt-2 text-center" data-aos="fade-up" data-aos-delay="350" onClick={() => setPage(page + 1)}>
                                                <span className="btn btn-info rounded-pill">Load More Events</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <ProfileBalance />
                            </div>
                        </div>
                        <ShapeComponent />
                    </section>
                </main>
        )
}

export default ProfileContainer;