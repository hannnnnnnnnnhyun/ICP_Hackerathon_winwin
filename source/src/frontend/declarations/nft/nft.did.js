export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getNftByOwner' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Int32,
              'owner' : IDL.Principal,
              'metadata' : IDL.Record({
                'name' : IDL.Text,
                'description' : IDL.Text,
                'attributes' : IDL.Record({
                  'name' : IDL.Text,
                  'category' : IDL.Text,
                  'price' : IDL.Text,
                  'location' : IDL.Text,
                }),
                'image' : IDL.Vec(IDL.Nat8),
              }),
            })
          ),
        ],
        ['query'],
      ),
    'getOwnerCount' : IDL.Func([IDL.Principal], [IDL.Int32], ['query']),
    'getTokenId' : IDL.Func(
        [IDL.Int32],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Int32,
              'owner' : IDL.Principal,
              'metadata' : IDL.Record({
                'name' : IDL.Text,
                'description' : IDL.Text,
                'attributes' : IDL.Record({
                  'name' : IDL.Text,
                  'category' : IDL.Text,
                  'price' : IDL.Text,
                  'location' : IDL.Text,
                }),
                'image' : IDL.Vec(IDL.Nat8),
              }),
            })
          ),
        ],
        ['query'],
      ),
    'getTokenIdByOwner' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Int32)],
        ['query'],
      ),
    'mint' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Int32,
            'owner' : IDL.Principal,
            'metadata' : IDL.Record({
              'name' : IDL.Text,
              'description' : IDL.Text,
              'attributes' : IDL.Record({
                'name' : IDL.Text,
                'category' : IDL.Text,
                'price' : IDL.Text,
                'location' : IDL.Text,
              }),
              'image' : IDL.Vec(IDL.Nat8),
            }),
          }),
          IDL.Text,
        ],
        [IDL.Int32],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
