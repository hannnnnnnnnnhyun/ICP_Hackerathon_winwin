export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createEvent' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Principal,
            'creator' : IDL.Principal,
            'logo' : IDL.Text,
            'name' : IDL.Text,
            'finish' : IDL.Bool,
            'category' : IDL.Text,
            'transactions' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'pic' : IDL.Text,
                'challenger' : IDL.Principal,
              })
            ),
            'price' : IDL.Nat,
            'location' : IDL.Text,
          }),
        ],
        [IDL.Bool],
        [],
      ),
    'createTransaction' : IDL.Func(
        [
          IDL.Principal,
          IDL.Record({
            'id' : IDL.Principal,
            'pic' : IDL.Text,
            'challenger' : IDL.Principal,
          }),
        ],
        [IDL.Bool],
        [],
      ),
    'exitEvent' : IDL.Func(
        [
          IDL.Principal,
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'pic' : IDL.Text,
              'challenger' : IDL.Principal,
            })
          ),
        ],
        [IDL.Bool],
        [],
      ),
    'getAllEvents' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'creator' : IDL.Principal,
              'logo' : IDL.Text,
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Text,
                  'challenger' : IDL.Principal,
                })
              ),
              'price' : IDL.Nat,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getAllTransactions' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'pic' : IDL.Text,
              'challenger' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'getEventByUser' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'creator' : IDL.Principal,
              'logo' : IDL.Text,
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Text,
                  'challenger' : IDL.Principal,
                })
              ),
              'price' : IDL.Nat,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getEvents' : IDL.Func(
        [IDL.Int32, IDL.Int32],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'creator' : IDL.Principal,
              'logo' : IDL.Text,
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Text,
                  'challenger' : IDL.Principal,
                })
              ),
              'price' : IDL.Nat,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getTransactions' : IDL.Func(
        [IDL.Principal, IDL.Int32, IDL.Int32],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'pic' : IDL.Text,
              'challenger' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
