import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onChangeNoticeMessageAction, onToggleNoticeModalAction, onToggleLoadingModalAction } from "@action/modal.action";
import { RootState } from '@reducer/root.reducer';
import { LedgerActor } from '@actor/ledger.actor'
import { Principal } from '@dfinity/principal';

const ProfileBalanceComponent = () => {
  const dispatch = useDispatch();
  const { nftBalance, tokenBalance, principal } = useSelector((root: RootState) => root.HeaderReducer);
  const [balance, setBalance] = useState('0');

  const getICPBalance = async (principal: string) => {
    const ledgerActor = await LedgerActor.getLedgerActor();
    const balance = await ledgerActor.icrc1_balance_of({ owner: Principal.fromText(principal), subaccount: [] })
    setBalance((Number(balance) / 100000000).toFixed(4));
  }

  const selectList = ["ICP to Mart", "Mart to ICP"];
  const [Selected, setSelected] = useState("ICP to Mart");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  useEffect(() => { getICPBalance(principal) }, [])

  const onSubmit = async (data: any) => {
    dispatch(onToggleLoadingModalAction(true));
    // const ledgerActor = await LedgerActor.getLedgerActor();
    // if (Selected === 'ICP to Mart') {
    //   setTest((Number(data.target.amount.value) * 100000000).toFixed(0))
    //   const result: any = await ledgerActor.icrc1_transfer({
    //     to: { owner: Principal.fromText('c5yns-yvrcx-j353o-xggup-vqx62-qi23g-l6rfm-rxo4q-qic2c-hthnr-mae'), subaccount: [] },
    //     fee: [],
    //     memo: [],
    //     from_subaccount: [],
    //     created_at_time: [],
    //     amount: BigInt((Number(data.target.amount.value) * 100000000).toFixed(0))
    //   })
    // }
    dispatch(onChangeNoticeMessageAction('testtest'));
    dispatch(onToggleNoticeModalAction());
  }

  const [test, setTest] = useState('test');

  return (
    <div className="col-md-4 position-relative">
      <div data-aos="fade-up" className="mb-4 border rounded py-5 px-4 shadow-sm">
        <h5 className="mb-4">About You</h5>
        <small className="text-body-secondary mb-2 d-block">ICP</small>
        <p className="mb-0">{balance} ICP</p>
        <hr className="my-3" />
        <small className="text-body-secondary mb-2 d-block">Token</small>
        <p className="mb-0">{tokenBalance} Mart</p>
        <hr className="my-3" />
        <small className="text-body-secondary mb-2 d-block">NFT</small>
        <p className="mb-0">{nftBalance} NFTs</p>
        <hr className="my-3" />
        <br />
        <h5 className="mb-4">ICP - Mart Swap</h5>
        <form onSubmit={onSubmit}>
          <div className="col-sm-8 mb-3">
            <div className="position-relative">
              <select className=" form-control-sm w-60" onChange={handleSelect} value={Selected}>
                {selectList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input type="text" placeholder="" className="form-control" name='amount' />
            </div>

            <button type="submit" className="btn btn-primary w-20">Swap</button>
            <div>{test}</div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileBalanceComponent;