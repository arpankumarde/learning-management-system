"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const HomeCarousel = () => {
  const banners = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/Dec_24/3000X1200_999_JAN._CB537341775_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/headphones/DEC_audio/3000x1200_Boult_Prime-2._CB537348243_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/BAU/PC/Hero/HO/HO_PC_tall_Hero_3000x1200_T1._CB566296997_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/Manish/BAU/Nov24/GW_Mini_Event_PC_3000X1200._CB536996950_.jpg",
  ];

  return (
    <Carousel
      className="w-11/12 mx-auto"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image src={banner} alt="carousel" width={1600} height={600} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeCarousel;
