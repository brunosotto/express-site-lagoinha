export interface IObjectLagGroup {
    created_at: Date;
    has_regional: boolean;
    has_subgroup: boolean;
    has_tertiary_group: boolean;
    id: number;
    is_active: boolean;
    label_regional: string;
    label_subgroup: string;
    label_tertiary_group: string;
    name: string;
    resource_uri: string;
    updated_at: string;
}
