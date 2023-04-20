import React from 'react'
import { FiUser } from 'react-icons/fi'

const Promos = () => {
    return (
        <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
                <div className='flex lg:gap-10 gap-6 flex-col'>
                    <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed'>
                        Download Your Movies, Watch Offline <br />
                        Enjoy on Your Mobile
                    </h1>
                    <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.officiis esse quia, laborum doloremque perferendis mollitia voluptatib veritatis tenetur temporibus quisquam? Aspernatur quisquam, modi illo ab sunt ea omnis, officiis ipsam voluptatem adoiuoki, quibusdam tenetur quis sapiente facere dolores vero sed non accusantium totam dolor magni. Dolores, voluptatibus hgithd repudiandae. Quos quia accusamus optio? Officia deseruntikk, dolorum nisi porro illo, vel optio suscipit pariatur alias remmmer provident expedita sequi. Fugiat nam quidem voluptatum porro unde ipsum enim deleniti...
                    </p>
                    <div className='flex gap-4 md:text-lg text-sm'>
                        <div className='flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold'>
                            HD 4K
                        </div>
                        <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md font-bold'>
                            <FiUser /> 2K
                        </div>
                    </div>
                </div>

                <div>
                    <img src="/images/mobile2.png" alt="Mobile app" className='w-full object-contain' />
                </div>
            </div>
        </div>
    )
}

export default Promos