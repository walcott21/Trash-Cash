interface Reward {
    id: string,
    name: string,
    claims: [Claim],
    image: string,
    value: number,
    quantity: number,
}

interface Claim {
    UserId: string,
    Date: Date
}