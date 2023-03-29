// Assets
import Vet from 'assets/images/partners/vet.jpg';
import Care from 'assets/images/partners/care.jpg';
import Pound from 'assets/images/partners/pound.jpg';
import Hygiene from 'assets/images/partners/hygiene.jpg';
import Adopt from 'assets/images/partners/adoption.jpg';

export const About = () => (
    [
        {
            img: Vet,
            alt: 'vet',
            title: 'Quezon City Veterinary Department',
            info: `Conducts animal vaccinations, animal pounding operations, animal adoption services and other veterinary services. It promotes and implements animal health, animal welfare, 
                        animal rights and protection within the city. To execute different policies, programs and other services, quezon city veterinary department divided it into three (3) divisions 
                        which are animal care and disease control division, city pound division, and food hygiene and regulatory division.`,
            link: 'https://www.facebook.com/QCVDgovph/',
        },
        {
            img: Care,
            alt: 'care',
            title: 'Animal Care And Disease Control',
            info: `Conducts the mass registration, vaccination, dog tagging and spay and neuter of pets.`,
            link: 'https://www.facebook.com/QCAnimalCare/',
        },
        {
            img: Pound,
            alt: 'pound',
            title: 'City Pound Division',
            info: `Are for animal impounding, redemption of impounded animals, field control and disposition of unregistered stray and unvaccinated dogs. 
                        Under this division is the animal care and adoption center which conducts the process of animal adoption.`,
            link: 'https://www.facebook.com/QCVDgovph',
        },
        {
            img: Hygiene,
            alt: 'hygiene',
            title: 'Food Hygiene And Regulatory Division',
            info: `Is assigned in meat inspection, license meat handlers, veterinary clearance and meat transport vehicle.`,
            link: 'https://www.facebook.com/QCAnimalCare/',
        },
        {
            img: Adopt,
            alt: 'adopt',
            title: 'Animal Care And Adoption Center',
            info: `Under the city pound division provides an electronic services (eservices) that can help the citizens to adopt easily through this website. Its mission is to promote animal 
                        adoption in the city and help the animals to find a new family. Aside from that, qc animal care and adoption center e-services offers services such as surrendering of pets, 
                        reporting of missing pets and provides information about pet vaccination and other programs for pets.`,
            link: 'https://www.facebook.com/animalcareandadoptioncenter/',
        }
    ]
)