export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createEvent' : IDL.Func(
        [
          IDL.Record({
            'id' : IDL.Principal,
            'creator' : IDL.Principal,
            'logo' : IDL.Vec(IDL.Nat8),
            'name' : IDL.Text,
            'finish' : IDL.Bool,
            'category' : IDL.Text,
            'transactions' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'pic' : IDL.Vec(IDL.Nat8),
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
            'pic' : IDL.Vec(IDL.Nat8),
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
              'pic' : IDL.Vec(IDL.Nat8),
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
              'logo' : IDL.Vec(IDL.Nat8),
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Vec(IDL.Nat8),
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
              'pic' : IDL.Vec(IDL.Nat8),
              'challenger' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
    'getEvent' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'creator' : IDL.Principal,
              'logo' : IDL.Vec(IDL.Nat8),
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Vec(IDL.Nat8),
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
    'getEventByUser' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'creator' : IDL.Principal,
              'logo' : IDL.Vec(IDL.Nat8),
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Vec(IDL.Nat8),
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
              'logo' : IDL.Vec(IDL.Nat8),
              'name' : IDL.Text,
              'finish' : IDL.Bool,
              'category' : IDL.Text,
              'transactions' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'pic' : IDL.Vec(IDL.Nat8),
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
              'pic' : IDL.Vec(IDL.Nat8),
              'challenger' : IDL.Principal,
            })
          ),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
