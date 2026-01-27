export interface Candidate {
    id: number;
    name: string;
    name_bn?: string;
    party: string;
    party_bn?: string;
    symbol: string;
    image_url?: string;
    manifesto?: string;
    manifesto_bn?: string;
    education?: string;
    experience?: string;
    age?: number;
    status: 'clean' | 'pending';
    division: string;
    district: string;
    area: string;
    matchPercentage?: number; // Calculated on client
}

export interface VoteCenter {
    id: number;
    name: string;
    name_bn?: string;
    address: string;
    address_bn?: string;
    division: string;
    district: string;
    area: string;
    latitude?: number;
    longitude?: number;
    capacity?: number;
}
