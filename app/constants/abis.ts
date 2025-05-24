// constants/abis.ts
export const HYGENIA_ABI = [
    // Paste your complete ABI from paste.txt here
    [
        {
            "type": "constructor",
            "name": "constructor",
            "inputs": [
                {
                    "name": "admin",
                    "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                    "name": "token_address",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ]
        },
        {
            "type": "struct",
            "name": "core::integer::u256",
            "members": [
                {
                    "name": "low",
                    "type": "core::integer::u128"
                },
                {
                    "name": "high",
                    "type": "core::integer::u128"
                }
            ]
        },
        {
            "type": "function",
            "name": "make_payment",
            "inputs": [
                {
                    "name": "order_id",
                    "type": "core::integer::u128"
                },
                {
                    "name": "amount",
                    "type": "core::integer::u256"
                }
            ],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "record_payment",
            "inputs": [
                {
                    "name": "buyer",
                    "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                    "name": "order_id",
                    "type": "core::integer::u128"
                },
                {
                    "name": "amount",
                    "type": "core::integer::u256"
                }
            ],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "withdraw_tokens",
            "inputs": [
                {
                    "name": "to",
                    "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                    "name": "amount",
                    "type": "core::integer::u256"
                }
            ],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "withdraw_all_tokens",
            "inputs": [
                {
                    "name": "to",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "pause_contract",
            "inputs": [],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "unpause_contract",
            "inputs": [],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "function",
            "name": "get_purchase_count",
            "inputs": [
                {
                    "name": "user",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "outputs": [
                {
                    "type": "core::integer::u32"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_purchase",
            "inputs": [
                {
                    "name": "user",
                    "type": "core::starknet::contract_address::ContractAddress"
                },
                {
                    "name": "index",
                    "type": "core::integer::u32"
                }
            ],
            "outputs": [
                {
                    "type": "(core::integer::u128, core::integer::u256)"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_user_purchases",
            "inputs": [
                {
                    "name": "user",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "outputs": [
                {
                    "type": "core::array::Array::<(core::integer::u128, core::integer::u256)>"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_token_address",
            "inputs": [],
            "outputs": [
                {
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_admin",
            "inputs": [],
            "outputs": [
                {
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_total_revenue",
            "inputs": [],
            "outputs": [
                {
                    "type": "core::integer::u256"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "get_contract_balance",
            "inputs": [],
            "outputs": [
                {
                    "type": "core::integer::u256"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "enum",
            "name": "core::bool",
            "variants": [
                {
                    "name": "False",
                    "type": "()"
                },
                {
                    "name": "True",
                    "type": "()"
                }
            ]
        },
        {
            "type": "function",
            "name": "is_contract_paused",
            "inputs": [],
            "outputs": [
                {
                    "type": "core::bool"
                }
            ],
            "state_mutability": "view"
        },
        {
            "type": "function",
            "name": "transfer_admin",
            "inputs": [
                {
                    "name": "new_admin",
                    "type": "core::starknet::contract_address::ContractAddress"
                }
            ],
            "outputs": [],
            "state_mutability": "external"
        },
        {
            "type": "event",
            "name": "hygenia::Hygenia::PaymentMade",
            "kind": "struct",
            "members": [
                {
                    "name": "buyer",
                    "type": "core::starknet::contract_address::ContractAddress",
                    "kind": "data"
                },
                {
                    "name": "order_id",
                    "type": "core::integer::u128",
                    "kind": "data"
                },
                {
                    "name": "amount",
                    "type": "core::integer::u256",
                    "kind": "data"
                },
                {
                    "name": "purchase_index",
                    "type": "core::integer::u32",
                    "kind": "data"
                }
            ]
        },
        {
            "type": "event",
            "name": "hygenia::Hygenia::TokensWithdrawn",
            "kind": "struct",
            "members": [
                {
                    "name": "to",
                    "type": "core::starknet::contract_address::ContractAddress",
                    "kind": "data"
                },
                {
                    "name": "amount",
                    "type": "core::integer::u256",
                    "kind": "data"
                }
            ]
        },
        {
            "type": "event",
            "name": "hygenia::Hygenia::ContractPaused",
            "kind": "struct",
            "members": []
        },
        {
            "type": "event",
            "name": "hygenia::Hygenia::ContractUnpaused",
            "kind": "struct",
            "members": []
        },
        {
            "type": "event",
            "name": "hygenia::Hygenia::Event",
            "kind": "enum",
            "variants": [
                {
                    "name": "PaymentMade",
                    "type": "hygenia::Hygenia::PaymentMade",
                    "kind": "nested"
                },
                {
                    "name": "TokensWithdrawn",
                    "type": "hygenia::Hygenia::TokensWithdrawn",
                    "kind": "nested"
                },
                {
                    "name": "ContractPaused",
                    "type": "hygenia::Hygenia::ContractPaused",
                    "kind": "nested"
                },
                {
                    "name": "ContractUnpaused",
                    "type": "hygenia::Hygenia::ContractUnpaused",
                    "kind": "nested"
                }
            ]
        }
    ]
  ] as const;
  
  export const ERC20_ABI = [
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {"name": "spender", "type": "core::starknet::contract_address::ContractAddress"},
        {"name": "amount", "type": "core::integer::u256"}
      ],
      "outputs": [{"type": "core::bool"}],
      "state_mutability": "external"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        {"name": "owner", "type": "core::starknet::contract_address::ContractAddress"},
        {"name": "spender", "type": "core::starknet::contract_address::ContractAddress"}
      ],
      "outputs": [{"type": "core::integer::u256"}],
      "state_mutability": "view"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {"name": "account", "type": "core::starknet::contract_address::ContractAddress"}
      ],
      "outputs": [{"type": "core::integer::u256"}],
      "state_mutability": "view"
    }
  ] as const;