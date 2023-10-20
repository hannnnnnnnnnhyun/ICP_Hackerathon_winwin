import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@reducer/root.reducer';
const ProfileBalanceComponent = () => {
    const { nftBalance, tokenBalance } = useSelector((root: RootState) => root.HeaderReducer);

    return (
        <div className="col-md-4 position-relative">
          <div data-aos="fade-up" className="mb-4 border rounded py-5 px-4 shadow-sm">
            <h5 className="mb-4">About You</h5>
            <small className="text-body-secondary mb-2 d-block">Token</small>
            <p className="mb-0">{tokenBalance} Mark</p>
            <hr className="my-3"/>
            <small className="text-body-secondary mb-2 d-block">NFT</small>
            <p className="mb-0">{nftBalance} NFTs</p>
          </div>
        </div>
    )
}

export default ProfileBalanceComponent;