// Assets
import Vet from 'assets/images/hygiene.png';
import Care from 'assets/images/care.png';
import Pound from 'assets/images/pound.png';
import Hygiene from 'assets/images/hygiene.png';
import Adopt from 'assets/images/care.png';

export const About = () => (
    [
        {
            img: Vet,
            alt: 'vet',
            title: 'Quezon City Veterinary Department',
            info: `Conducts Animal Vaccinations, Animal Pounding Operations, Animal Adoption Services And Other Veterinary Services. 
                        It Promotes And Implements Animal Health, Animal Welfare, Animal Rights And Protection Within The City. 
                        To Execute Different Policies, Programs And Other Services, Quezon City Veterinary Department Divided It Into Three (3) Divisions Which Are Animal Care And Disease Control Division, 
                        City Pound Division, And Food Hygiene And Regulatory Division.`,
            link: 'https://www.facebook.com/QCVDgovph/',
        },
        {
            img: Care,
            alt: 'care',
            title: 'Animal Care And Disease Control',
            info: `Conducts The Mass Registration, Vaccination, Dog Tagging And Spay And Neuter Of Pets`,
            link: 'https://www.facebook.com/QCAnimalCare/',
        },
        {
            img: Pound,
            alt: 'pound',
            title: 'City Pound Division',
            info: `Are For Animal Impounding, Redemption Of Impounded Animals, Field Control And Disposition Of Unregistered Stray And Unvaccinated Dogs. 
                        Under This Division Is The Animal Care And Adoption Center Which Conducts The Process Of Animal Adoption.`,
            link: 'https://www.facebook.com/QCVDgovph',
        },
        {
            img: Hygiene,
            alt: 'hygiene',
            title: 'Food Hygiene And Regulatory Division',
            info: `Is Assigned In Meat Inspection, License Meat Handlers, Veterinary Clearance And Meat Transport Vehicle.`,
            link: 'https://www.facebook.com/QCAnimalCare/',
        },
        {
            img: Adopt,
            alt: 'adopt',
            title: 'Animal Care And Adoption Center',
            info: `Under The City Pound Division Provides An Electronic Services (EServices) That Can Help The Citizens To Adopt Easily Through This Website. 
                        Its Mission Is To Promote Animal Adoption In The City And Help The Animals To Find A New Family. Aside From That, QC Animal Care And Adoption Center EServices Offers Services Such As Surrendering Of Pets, 
                        Reporting Of Missing Pets And Provides Information About Pet Vaccination And Other Programs For Pets.`,
            link: 'https://www.facebook.com/animalcareandadoptioncenter/',
        }
    ]
)