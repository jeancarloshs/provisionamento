"use client"

export default async function TellProvisioningModel(
    positioning: string,
    clientName: string,
    clientAddress: string,
    serialNumber: string,
    userSIP: string,
    telephone: string,
    passwordSIP: string
) {
    return (
`configure equipment ont interface ${positioning} sw-ver-pland auto desc1 "${clientName}" desc2 "${clientAddress}" sernum ${serialNumber} sw-dnload-version auto voip-allowed iphost pland-cfgfile1 auto dnload-cfgfile1 auto
configure equipment ont interface ${positioning} admin-state up
configure equipment ont slot ${positioning}/2 planned-card-type pots plndnumdataports 0 plndnumvoiceports 2 admin-state up
configure equipment ont slot ${positioning}/14 planned-card-type veip plndnumdataports 1 plndnumvoiceports 0  admin-state up
configure qos interface ${positioning}/14/1 upstream-queue 0 bandwidth-profile name:HSI_1G_UP
configure qos interface ${positioning}/14/1 queue 0 shaper-profile name:HSI_1G_DOWN
configure qos interface ${positioning}/vuni upstream-queue 5 bandwidth-profile name:VOIP_UP_512K
configure interface port uni:${positioning}/14/1 admin-up
configure bridge port ${positioning}/14/1 max-unicast-mac 4
configure bridge port ${positioning}/14/1 vlan-id 1005 tag single-tagged
configure bridge port ${positioning}/14/1 vlan-id 202 tag single-tagged
configure equipment ont interface ${positioning} plnd-var SIP
configure bridge port ${positioning}/vuni max-unicast-mac 4
configure bridge port ${positioning}/vuni vlan-id 1004
configure bridge port ${positioning}/vuni pvid 1004
configure iphost ont ont:${positioning}/1 dhcp enabled ping enabled traceroute enabled vlan 1004
configure iphost ont ont:${positioning}/1 admin-state up
configure voice ont voip-config ont:${positioning}/1 protocol sip
configure voice ont sip-config ont:${positioning}/1 proxyserv-prof 2 outproxyserv-prof 4 primary-dns 1.1.1.1 reg-expire-time 590 aor-host-prt-prof 3 registrar-prof 4 soft-sw-vendor VSC uri-format sip-uri
configure voice ont voice-port ${positioning}/2/1 admin-state locked
configure voice ont voice-port ${positioning}/2/1 custinfo ont_porta_1 voipconfig sip pots-pwr-timer 300 rx-gain 1.000000 tx-gain 2.000000 impedance 600 voip-media-prof 4
configure voice ont voice-sip-port ${positioning}/2/1 user-aor ${userSIP} display-name ${telephone} val-scheme md5-digest user-name ${userSIP} password plain:${passwordSIP} realm asterisk voice-mail-prof none ntwk-dp-prof 4 app-serv-prof 4 ac-code-prof 4
configure voice ont voice-port ${positioning}/2/1 admin-state unlocked
exit all 
\n`
    );
}