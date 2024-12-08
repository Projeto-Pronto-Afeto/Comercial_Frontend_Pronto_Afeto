'use client'

import { useState } from "react";
import CuidadorCard from "./CuidadorCard";

interface CuidadorListProps{
    caregivers: Caregiver[];
}

const CuidadorList : React.FC<CuidadorListProps> = ({ caregivers}) => {
    const [careGiversState, setCaregivers] = useState<Caregiver[]>(caregivers);

    const handleApprove = (id: number) => {
        console.log(`Parent received approval for caregiver with ID: ${id}`);
        setCaregivers(careGiversState.filter((caregiver) => caregiver.cuidadorId !== id));
      };
    
      const handleReject = (id: number) => {
        console.log(`Parent received rejection for caregiver with ID: ${id}`);
        setCaregivers(careGiversState.filter((caregiver) => caregiver.cuidadorId !== id));
      };

    return (
        <div className="grid grid-cols-1 gap-4 py-6">
            {" "}
            {careGiversState.map((item: Caregiver) => (
              <CuidadorCard caregiver={item} onApprove={handleApprove} onReject={handleReject}/>
            ))}
        </div>
    );
};

export default CuidadorList;