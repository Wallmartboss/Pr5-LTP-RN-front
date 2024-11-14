const backgrounds = [
  {
    id: 1,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438103/bg-3_xcwhm4.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432731/bg1-2x-desk_rpokgy.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432731/bg1-2x-tab_hy7k8j.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432731/bg1-2x-mob_kpu7pq.jpg',
  },
  {
    id: 2,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438092/bg-2_vvffee.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432758/bg2-2x-desk_cd2wfl.jpg',
    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432783/bg2-2x-tab_jjdgd2.jpg',
    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432758/bg2-2x-mob_bo0o9q.jpg',
  },
  {
    id: 3,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438126/bg-5_dvvkce.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432796/bg3-2x-desk_ugcfcf.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432797/bg3-2x-tab_fkhdj2.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432796/bg3-2x-mob_khhnag.jpg',
  },
  {
    id: 4,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438142/bg-6_odcq2d.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432808/bg4-2x-desk_eanqjq.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432808/bg4-2x-tab_zg5j1f.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432808/bg4-2x-mob_fu7buy.jpg',
  },
  {
    id: 5,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438161/bg-8_g3u0ta.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432826/bg5-2x-desk_yedk5o.jpg',
    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432827/bg5-2x-tab_gccwn3.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432827/bg5-2x-mob_aofcov.jpg',
  },
  {
    id: 6,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438181/bg-10_pzhaew.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432843/bg6-2x-desk_io7acc.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432845/bg6-2x-tab_iy18bf.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432844/bg6-2x-mob_o7hjnw.jpg',
  },
  {
    id: 7,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438062/bg-1_wvtdlz.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432856/bg7-2x-desk_ryimyi.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432857/bg7-2x-tab_vritqv.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432856/bg7-2x-mob_alnvpy.jpg',
  },
  {
    id: 8,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438113/bg-4_omnhyo.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432869/bg8-2x-desk_z9worv.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432870/bg8-2x-tab_eohdpq.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432869/bg8-2x-mob_t86zws.jpg',
  },
  {
    id: 9,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438149/bg-7_stkxw9.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432879/bg9-2x-desk_u0mqse.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432897/bg9-2x-tab_pwfem5.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432896/bg9-2x-mob_wpiglz.jpg',
  },
  {
    id: 10,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438169/bg-9_rjsr7c.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432911/bg10-2x-desk_c56jns.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432912/bg10-2x-tab_jqqk97.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432912/bg10-2x-mob_j9u6nd.jpg',
  },
  {
    id: 11,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438195/bg-11_c3jzgk.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432923/bg11-2x-desk_tgifze.jpg',
    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432932/bg11-2x-tab_o2g56u.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432924/bg11-2x-mob_uo3iqe.jpg',
  },
  {
    id: 12,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438210/bg-12_cwaqj3.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432943/bg12-2x-desk_ybrdpw.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432945/bg12-2x-tab_dvsd8z.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432944/bg12-2x-mob_ghtoe6.jpg',
  },
  {
    id: 13,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438220/bg-13_txi8z7.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432958/bg13-2x-desk_zgbtuv.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432960/bg13-2x-tab_s5xdxw.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432959/bg13-2x-mob_peoj9c.jpg',
  },
  {
    id: 14,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438230/bg-14_ichs7p.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432982/bg14-2x-desk_dat6ua.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432984/bg14-2x-tab_dplb5v.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432983/bg14-2x-mob_mvzxc7.jpg',
  },
  {
    id: 15,
    min: 'https://res.cloudinary.com/doboin9hw/image/upload/v1731438241/bg-15_gddsah.png',
    desktop:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432995/bg15-2x-desk_r4dguf.jpg',

    tablet:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432997/bg15-2x-tab_dffmnn.jpg',

    mobile:
      'https://res.cloudinary.com/doboin9hw/image/upload/v1731432996/bg15-2x-mob_ss7bpq.jpg',
  },
];
export default backgrounds;
