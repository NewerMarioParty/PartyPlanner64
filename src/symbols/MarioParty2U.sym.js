export default [{
      addr: 2147484416, // 0x80000300
      type: "u32",
      name: "osTvType",
      desc: "0=PAL" },
{
      addr: 2147484420, // 0x80000304
      type: "u32",
      name: "osRomType",
      desc: "0=cart" },
{
      addr: 2147484424, // 0x80000308
      type: "data",
      name: "osRomBase",
      desc: "B0000000=cart" },
{
      addr: 2147484428, // 0x8000030C
      type: "data",
      name: "osResetType",
      desc: "0=cold reset" },
{
      addr: 2147484440, // 0x80000318
      type: "data",
      name: "osMemSize",
      desc: "Size of RDRAM" },
{
      addr: 2147568404, // 0x80014B14
      type: "code",
      name: "PlaySound",
      desc: "A0=sound_index" },
{
      addr: 2147579520, // 0x80017680
      type: "code",
      name: "ReadMainFS",
      desc: "Reads file from MainFS" },
{
      addr: 2147579904, // 0x80017800
      type: "code",
      name: "FreeMainFS",
      desc: "Free's an allocated MainFS file pointer" },
{
      addr: 2147584764, // 0x80018AFC
      type: "code",
      name: "GetRandomByte" },
{
      addr: 2147749248, // 0x80040D80
      type: "code",
      name: "MakePermHeap",
      desc: "A0=heap_addr" },
{
      addr: 2147749284, // 0x80040DA4
      type: "code",
      name: "MallocPerm",
      desc: "A0=size" },
{
      addr: 2147749320, // 0x80040DC8
      type: "code",
      name: "FreePerm",
      desc: "A0=addr" },
{
      addr: 2147749456, // 0x80040E50
      type: "code",
      name: "MakeTempHeap",
      desc: "A0=heap_addr" },
{
      addr: 2147749492, // 0x80040E74
      type: "code",
      name: "MallocTemp",
      desc: "A0=size" },
{
      addr: 2147749528, // 0x80040E98
      type: "code",
      name: "FreeTemp",
      desc: "A0=addr" },
{
      addr: 2147764224, // 0x80044800
      type: "code",
      name: "RunDecisionTree",
      desc: "A0=decision_tree_pointer" },
{
      addr: 2147797556, // 0x8004CA34
      type: "code",
      name: "ShowPlayerCoinChange",
      desc: "A0=player_index" },
{
      addr: 2147800736, // 0x8004D6A0
      type: "code",
      name: "UseMushroom",
      desc: "Mushroom item function" },
{
      addr: 2147800884, // 0x8004D734
      type: "code",
      name: "UseSkeleton_key",
      desc: "Skeleton Key item function" },
{
      addr: 2147800920, // 0x8004D758
      type: "code",
      name: "UsePlunder_chest",
      desc: "Plunder Chest item function" },
{
      addr: 2147800960, // 0x8004D780
      type: "code",
      name: "UseBowserBomb",
      desc: "Bowser Bomb item function" },
{
      addr: 2147800992, // 0x8004D7A0
      type: "code",
      name: "UseDuelingGlove",
      desc: "Dueling Glove item function" },
{
      addr: 2147801176, // 0x8004D858
      type: "code",
      name: "UseWarpBlock",
      desc: "Warp Block item function" },
{
      addr: 2147801264, // 0x8004D8B0
      type: "code",
      name: "UseGoldenMushroom",
      desc: "Golden Mushroom item function" },
{
      addr: 2147801412, // 0x8004D944
      type: "code",
      name: "UseBooBell",
      desc: "Boo Bell item function" },
{
      addr: 2147801644, // 0x8004DA2C
      type: "code",
      name: "UseBowserSuit",
      desc: "Bowser Suit item function" },
{
      addr: 2147801796, // 0x8004DAC4
      type: "code",
      name: "UseMagicLamp",
      desc: "Magic Lamp item function" },
{
      addr: 2147828328, // 0x80054268
      type: "code",
      name: "AddArrowAngle",
      desc: "F0=degree_rot_of_arrow" },
{
      addr: 2147830668, // 0x80054B8C
      type: "code",
      name: "GetSpaceData",
      desc: "A0=space_index" },
{
      addr: 2147830704, // 0x80054BB0
      type: "code",
      name: "GetAbsSpaceIndexFromChainSpaceIndex",
      desc: "A0=chain_index" },
{
      addr: 2147833484, // 0x8005568C
      type: "code",
      name: "EventTableHydrate",
      desc: "Moves event table data into the space data" },
{
      addr: 2147836228, // 0x80056144
      type: "code",
      name: "CloseMessage",
      desc: "Closes open message window (with animation)" },
{
      addr: 2147836776, // 0x80056368
      type: "code",
      name: "ShowMessage",
      desc: "A0=character_index" },
{
      addr: 2147839024, // 0x80056C30
      type: "code",
      name: "RotateCharacterModel",
      desc: "A0=player_index (-1 for cur)" },
{
      addr: 2147840736, // 0x800572E0
      type: "code",
      name: "SetPlayerOntoChain",
      desc: "A0=player_index" },
{
      addr: 2147840844, // 0x8005734C
      type: "code",
      name: "SetNextChainAndSpace" },
{
      addr: 2147867696, // 0x8005DC30
      type: "code",
      name: "GetCurrentPlayerIndex" },
{
      addr: 2147867708, // 0x8005DC3C
      type: "code",
      name: "GetPlayerStruct",
      desc: "A0=player_index pass -1 to get current player's struct" },
{
      addr: 2147867780, // 0x8005DC84
      type: "code",
      name: "PlayerIsCurrent",
      desc: "A0=player_index tests if A0 is the current player" },
{
      addr: 2147867808, // 0x8005DCA0
      type: "code",
      name: "PlayerIsCPU",
      desc: "A0=player_index" },
{
      addr: 2147867848, // 0x8005DCC8
      type: "code",
      name: "AdjustPlayerCoins",
      desc: "A0=player_index" },
{
      addr: 2147867960, // 0x8005DD38
      type: "code",
      name: "PlayerHasCoins",
      desc: "A0=player_index" },
{
      addr: 2147868008, // 0x8005DD68
      type: "code",
      name: "SetBoardPlayerAnimation",
      desc: "A0=player_index" },
{
      addr: 2147882164, // 0x800614B4
      type: "code",
      name: "AdjustPlayerCoinsGradual",
      desc: "A0=player_index" },
{
      addr: 2147910752, // 0x80068460
      type: "code",
      name: "MakeHeap",
      desc: "A0=addr" },
{
      addr: 2147910784, // 0x80068480
      type: "code",
      name: "Malloc",
      desc: "A0=heap pointer (main or temp)" },
{
      addr: 2147910924, // 0x8006850C
      type: "code",
      name: "Free",
      desc: "A0=allocated heap pointer" },
{
      addr: 2147967168, // 0x800760C0
      type: "code",
      name: "InitObjSys" },
{
      addr: 2147970660, // 0x80076E64
      type: "code",
      name: "InitProcess" },
{
      addr: 2147981148, // 0x8007975C
      type: "code",
      name: "PlayCharacterSound",
      desc: "A0=sound_index" },
{
      addr: 2147998176, // 0x8007D9E0
      type: "code",
      name: "SleepProcess" },
{
      addr: 2147998276, // 0x8007DA44
      type: "code",
      name: "SleepVProcess" },
{
      addr: 2148070724, // 0x8008F544
      type: "code",
      name: "InitFadeIn",
      desc: "A0=fade_type" },
{
      addr: 2148070828, // 0x8008F5AC
      type: "code",
      name: "InitFadeOut",
      desc: "A0=fade_type" },
{
      addr: 2148397008, // 0x800DEFD0
      type: "data",
      name: "perm_heap_addr",
      desc: "Permanent heap pointer" },
{
      addr: 2148397024, // 0x800DEFE0
      type: "data",
      name: "temp_heap_addr",
      desc: "Temporary heap address" },
{
      addr: 2148084464, // 0x80092AF0
      type: "code",
      name: "alSynStartVoiceParams" },
{
      addr: 2148084880, // 0x80092C90
      type: "code",
      name: "alSynSetPan" },
{
      addr: 2148101828, // 0x80096EC4
      type: "code",
      name: "__leoCommand" },
{
      addr: 2148105040, // 0x80097B50
      type: "code",
      name: "__leoAnalize_asic_status" },
{
      addr: 2148106224, // 0x80097FF0
      type: "code",
      name: "__leoSend_asic_cmd_w" },
{
      addr: 2148106280, // 0x80098028
      type: "code",
      name: "__leoSend_asic_cmd_w_nochkDiskChange" },
{
      addr: 2148106596, // 0x80098164
      type: "code",
      name: "__leoRecal_w" },
{
      addr: 2148106736, // 0x800981F0
      type: "code",
      name: "__leoSeek_w" },
{
      addr: 2148106880, // 0x80098280
      type: "code",
      name: "__leoChk_err_retry" },
{
      addr: 2148107152, // 0x80098390
      type: "code",
      name: "__leoChk_cur_drvmode" },
{
      addr: 2148107424, // 0x800984A0
      type: "code",
      name: "__LEOrw_flags" },
{
      addr: 2148107426, // 0x800984A2
      type: "code",
      name: "__LEOdma_que" },
{
      addr: 2148107450, // 0x800984BA
      type: "code",
      name: "__LEOPiDmaParam" },
{
      addr: 2148107474, // 0x800984D2
      type: "code",
      name: "__LEOtgt_param" },
{
      addr: 2148107490, // 0x800984E2
      type: "code",
      name: "__LEOasic_seq_ctl_shadow" },
{
      addr: 2148107494, // 0x800984E6
      type: "code",
      name: "__leoSet_mseq" },
{
      addr: 2148107860, // 0x80098654
      type: "code",
      name: "__leoClr_reset" },
{
      addr: 2148107972, // 0x800986C4
      type: "code",
      name: "__LEOcommand_que" },
{
      addr: 2148107996, // 0x800986DC
      type: "code",
      name: "__leoClr_queue" },
{
      addr: 2148108144, // 0x80098770
      type: "code",
      name: "__leoLba_to_phys" },
{
      addr: 2148108736, // 0x800989C0
      type: "code",
      name: "LeoDriveExist" },
{
      addr: 2148109280, // 0x80098BE0
      type: "code",
      name: "__leoActive" },
{
      addr: 2148109284, // 0x80098BE4
      type: "code",
      name: "LeoReadDiskID" },
{
      addr: 2148109376, // 0x80098C40
      type: "code",
      name: "__leoActive" },
{
      addr: 2148109380, // 0x80098C44
      type: "code",
      name: "LeoReadWrite" },
{
      addr: 2148109524, // 0x80098CD4
      type: "code",
      name: "__LEO_country_code" },
{
      addr: 2148109528, // 0x80098CD8
      type: "code",
      name: "__osShutdown" },
{
      addr: 2148109836, // 0x80098E0C
      type: "code",
      name: "__LeoBootGame2" },
{
      addr: 2148110360, // 0x80099018
      type: "code",
      name: "LeoBootGame" },
{
      addr: 2148110672, // 0x80099150
      type: "code",
      name: "__LeoBootGame3" },
{
      addr: 2148117912, // 0x8009AD98
      type: "code",
      name: "__leoInquiry" },
{
      addr: 2148118084, // 0x8009AE44
      type: "code",
      name: "__leoMode_sel" },
{
      addr: 2148118260, // 0x8009AEF4
      type: "code",
      name: "__leoStart_stop" },
{
      addr: 2148118496, // 0x8009AFE0
      type: "code",
      name: "__LEORAM_BYTE" },
{
      addr: 2148118524, // 0x8009AFFC
      type: "code",
      name: "__LEOdisk_type" },
{
      addr: 2148118525, // 0x8009AFFD
      type: "code",
      name: "__LEORAM_START_LBA" },
{
      addr: 2148118543, // 0x8009B00F
      type: "code",
      name: "__leoRd_capacity" },
{
      addr: 2148119508, // 0x8009B3D4
      type: "code",
      name: "__LEOtgt_param" },
{
      addr: 2148119520, // 0x8009B3E0
      type: "code",
      name: "leoRezero" },
{
      addr: 2148119668, // 0x8009B474
      type: "code",
      name: "leoSeek" },
{
      addr: 2148119860, // 0x8009B534
      type: "code",
      name: "__leoTest_unit_rdy" },
{
      addr: 2148123936, // 0x8009C520
      type: "code",
      name: "__osPiTable" },
{
      addr: 2148123940, // 0x8009C524
      type: "code",
      name: "osLeoDiskInit" },
{
      addr: 2148124092, // 0x8009C5BC
      type: "code",
      name: "__osDiskHandle" },
{
      addr: 2148124096, // 0x8009C5C0
      type: "code",
      name: "__LeoDiskHandle" },
{
      addr: 2148124448, // 0x8009C720
      type: "code",
      name: "osEepromWrite" },
{
      addr: 2148124808, // 0x8009C888
      type: "code",
      name: "__conteepwrite_o_00AC" },
{
      addr: 2148124976, // 0x8009C930
      type: "code",
      name: "__osEepStatus" },
{
      addr: 2148125392, // 0x8009CAD0
      type: "code",
      name: "osEepromProbe" },
{
      addr: 2148125520, // 0x8009CB50
      type: "code",
      name: "osEepromLongWrite" },
{
      addr: 2148125760, // 0x8009CC40
      type: "code",
      name: "osEepromLongRead" },
{
      addr: 2148127548, // 0x8009D33C
      type: "code",
      name: "__osEnqueueAndYield" },
{
      addr: 2148127884, // 0x8009D48C
      type: "code",
      name: "__osPopThread" },
{
      addr: 2148128304, // 0x8009D630
      type: "code",
      name: "__osDisableInt" },
{
      addr: 2148128416, // 0x8009D6A0
      type: "code",
      name: "__osRestoreInt" },
{
      addr: 2148128448, // 0x8009D6C0
      type: "code",
      name: "osSetIntMask" },
{
      addr: 2148128608, // 0x8009D760
      type: "code",
      name: "__osSetHWIntrRoutine" },
{
      addr: 2148128704, // 0x8009D7C0
      type: "code",
      name: "osCreatePiManager" },
{
      addr: 2148129104, // 0x8009D950
      type: "code",
      name: "__Dom2SpeedParam" },
{
      addr: 2148129112, // 0x8009D958
      type: "code",
      name: "__osPiTable" },
{
      addr: 2148129116, // 0x8009D95C
      type: "code",
      name: "__osPiDevMgr" },
{
      addr: 2148129220, // 0x8009D9C4
      type: "code",
      name: "__Dom1SpeedParam" },
{
      addr: 2148129336, // 0x8009DA38
      type: "code",
      name: "__osCurrentHandle" },
{
      addr: 2148129344, // 0x8009DA40
      type: "code",
      name: "__osPiTable" },
{
      addr: 2148129348, // 0x8009DA44
      type: "code",
      name: "__osPiDevMgr" },
{
      addr: 2148129600, // 0x8009DB40
      type: "code",
      name: "osEPiWriteIo" },
{
      addr: 2148129696, // 0x8009DBA0
      type: "code",
      name: "osEPiReadIo" },
{
      addr: 2148129792, // 0x8009DC00
      type: "code",
      name: "osEPiStartDma" },
{
      addr: 2148129952, // 0x8009DCA0
      type: "code",
      name: "__CartRomHandle" },
{
      addr: 2148130068, // 0x8009DD14
      type: "code",
      name: "osCartRomInit" },
{
      addr: 2148130336, // 0x8009DE20
      type: "code",
      name: "__osDevMgrMain" },
{
      addr: 2148131296, // 0x8009E1E0
      type: "code",
      name: "__osPiCreateAccessQueue" },
{
      addr: 2148131336, // 0x8009E208
      type: "code",
      name: "__osPiGetAccess" },
{
      addr: 2148131380, // 0x8009E234
      type: "code",
      name: "__osPiGetAccess" },
{
      addr: 2148131444, // 0x8009E274
      type: "code",
      name: "__osPiAccessQueue" },
{
      addr: 2148131468, // 0x8009E28C
      type: "code",
      name: "__osPiCreateAccessQueue" },
{
      addr: 2148131488, // 0x8009E2A0
      type: "code",
      name: "__osPiRelAccess" },
{
      addr: 2148131536, // 0x8009E2D0
      type: "code",
      name: "osAiGetLength" },
{
      addr: 2148131552, // 0x8009E2E0
      type: "code",
      name: "__osPiAccessQueueEnabled" },
{
      addr: 2148132000, // 0x8009E4A0
      type: "code",
      name: "alBnkfNew" },
{
      addr: 2148132148, // 0x8009E534
      type: "code",
      name: "alSeqFileNew" },
{
      addr: 2148132212, // 0x8009E574
      type: "code",
      name: "__bnkf_o_0098" },
{
      addr: 2148132384, // 0x8009E620
      type: "code",
      name: "__bnkf_o_0118" },
{
      addr: 2148132532, // 0x8009E6B4
      type: "code",
      name: "__bnkf_o_01D8" },
{
      addr: 2148132620, // 0x8009E70C
      type: "code",
      name: "__bnkf_o_0258" },
{
      addr: 2148132720, // 0x8009E770
      type: "code",
      name: "alEvtqFlushType" },
{
      addr: 2148132844, // 0x8009E7EC
      type: "code",
      name: "alEvtqNextEvent" },
{
      addr: 2148132896, // 0x8009E820
      type: "code",
      name: "alEvtqFlush" },
{
      addr: 2148132996, // 0x8009E884
      type: "code",
      name: "alEvtqPostEvent" },
{
      addr: 2148133016, // 0x8009E898
      type: "code",
      name: "alEvtqPostEvent" },
{
      addr: 2148133284, // 0x8009E9A4
      type: "code",
      name: "alEvtqNextEvent" },
{
      addr: 2148133384, // 0x8009EA08
      type: "code",
      name: "alEvtqFlushType" },
{
      addr: 2148133436, // 0x8009EA3C
      type: "code",
      name: "alEvtqNew" },
{
      addr: 2148133660, // 0x8009EB1C
      type: "code",
      name: "alLink" },
{
      addr: 2148133692, // 0x8009EB3C
      type: "code",
      name: "alUnlink" },
{
      addr: 2148133744, // 0x8009EB70
      type: "code",
      name: "alHeapInit" },
{
      addr: 2148133808, // 0x8009EBB0
      type: "code",
      name: "alHeapDBAlloc" },
{
      addr: 2148133888, // 0x8009EC00
      type: "code",
      name: "alCopy" },
{
      addr: 2148133952, // 0x8009EC40
      type: "code",
      name: "alCSeqGetLoc" },
{
      addr: 2148134068, // 0x8009ECB4
      type: "code",
      name: "alCSeqSetLoc" },
{
      addr: 2148134184, // 0x8009ED28
      type: "code",
      name: "alCSeqNewMarker" },
{
      addr: 2148134220, // 0x8009ED4C
      type: "code",
      name: "alCSeqNextEvent" },
{
      addr: 2148134464, // 0x8009EE40
      type: "code",
      name: "__alCSeqNextDelta" },
{
      addr: 2148134592, // 0x8009EEC0
      type: "code",
      name: "__cseq_o_0194" },
{
      addr: 2148135140, // 0x8009F0E4
      type: "code",
      name: "__alCSeqNextDelta" },
{
      addr: 2148135512, // 0x8009F258
      type: "code",
      name: "alCSeqNew" },
{
      addr: 2148136404, // 0x8009F5D4
      type: "code",
      name: "__cseq_o_02A4" },
{
      addr: 2148136588, // 0x8009F68C
      type: "code",
      name: "__cseq_o_0088" },
{
      addr: 2148136704, // 0x8009F700
      type: "code",
      name: "alSeqpDelete" },
{
      addr: 2148136736, // 0x8009F720
      type: "code",
      name: "alSeqpGetChlFXMix" },
{
      addr: 2148136768, // 0x8009F740
      type: "code",
      name: "alSeqpGetChlPan" },
{
      addr: 2148136800, // 0x8009F760
      type: "code",
      name: "alSeqpGetChlVol" },
{
      addr: 2148136832, // 0x8009F780
      type: "code",
      name: "alSeqpGetChlProgram" },
{
      addr: 2148136960, // 0x8009F800
      type: "code",
      name: "alCSPGetTempo" },
{
      addr: 2148137008, // 0x8009F830
      type: "code",
      name: "alSeqpGetState" },
{
      addr: 2148137024, // 0x8009F840
      type: "code",
      name: "alSeqpPlay" },
{
      addr: 2148137072, // 0x8009F870
      type: "code",
      name: "alSeqpSetBank" },
{
      addr: 2148137120, // 0x8009F8A0
      type: "code",
      name: "alSeqpSetSeq" },
{
      addr: 2148137168, // 0x8009F8D0
      type: "code",
      name: "alSeqpSetTempo" },
{
      addr: 2148137248, // 0x8009F920
      type: "code",
      name: "alSeqpSetVol" },
{
      addr: 2148137296, // 0x8009F950
      type: "code",
      name: "alSeqpStop" },
{
      addr: 2148137344, // 0x8009F980
      type: "code",
      name: "__CSPPostNextSeqEvent" },
{
      addr: 2148137460, // 0x8009F9F4
      type: "code",
      name: "alCSPNew" },
{
      addr: 2148138936, // 0x8009FFB8
      type: "code",
      name: "__csplayer_o_046C" },
{
      addr: 2148139052, // 0x800A002C
      type: "code",
      name: "__csplayer_o_01D0" },
{
      addr: 2148139308, // 0x800A012C
      type: "code",
      name: "__csplayer_o_03E0" },
{
      addr: 2148141448, // 0x800A0988
      type: "code",
      name: "__csplayer_o_03F4" },
{
      addr: 2148141848, // 0x800A0B18
      type: "code",
      name: "__csplayer_o_115C" },
{
      addr: 2148141992, // 0x800A0BA8
      type: "code",
      name: "__csplayer_o_05B4" },
{
      addr: 2148142048, // 0x800A0BE0
      type: "code",
      name: "alSndpDelete" },
{
      addr: 2148142096, // 0x800A0C10
      type: "code",
      name: "alSndpAllocate" },
{
      addr: 2148142288, // 0x800A0CD0
      type: "code",
      name: "alSndpDeallocate" },
{
      addr: 2148142368, // 0x800A0D20
      type: "code",
      name: "alSndpSetSound" },
{
      addr: 2148142384, // 0x800A0D30
      type: "code",
      name: "alSndpPlay" },
{
      addr: 2148142480, // 0x800A0D90
      type: "code",
      name: "alSndpStop" },
{
      addr: 2148142560, // 0x800A0DE0
      type: "code",
      name: "alSndpGetState" },
{
      addr: 2148142592, // 0x800A0E00
      type: "code",
      name: "alSndpSetPitch" },
{
      addr: 2148142672, // 0x800A0E50
      type: "code",
      name: "alSndpSetPriority" },
{
      addr: 2148142720, // 0x800A0E80
      type: "code",
      name: "alSndpSetVol" },
{
      addr: 2148142800, // 0x800A0ED0
      type: "code",
      name: "alSndpSetPan" },
{
      addr: 2148142880, // 0x800A0F20
      type: "code",
      name: "alSndpSetFXMix" },
{
      addr: 2148143252, // 0x800A1094
      type: "code",
      name: "alAudioFrame" },
{
      addr: 2148143684, // 0x800A1244
      type: "code",
      name: "alSynNew" },
{
      addr: 2148144176, // 0x800A1430
      type: "code",
      name: "__synthesizer_o_0440" },
{
      addr: 2148144324, // 0x800A14C4
      type: "code",
      name: "__synthesizer_o_0370" },
{
      addr: 2148144472, // 0x800A1558
      type: "code",
      name: "__synthesizer_o_032C" },
{
      addr: 2148144560, // 0x800A15B0
      type: "code",
      name: "alSynDelete" },
{
      addr: 2148144576, // 0x800A15C0
      type: "code",
      name: "alSynAddPlayer" },
{
      addr: 2148144656, // 0x800A1610
      type: "code",
      name: "alSynRemovePlayer" },
{
      addr: 2148144816, // 0x800A16B0
      type: "code",
      name: "alSynFreeVoice" },
{
      addr: 2148144976, // 0x800A1750
      type: "code",
      name: "alSynAllocVoice" },
{
      addr: 2148145160, // 0x800A1808
      type: "code",
      name: "alSynAllocVoice" },
{
      addr: 2148145272, // 0x800A1878
      type: "code",
      name: "__synallocvoice_o_0048" },
{
      addr: 2148145456, // 0x800A1930
      type: "code",
      name: "alSynStopVoice" },
{
      addr: 2148145584, // 0x800A19B0
      type: "code",
      name: "alSynStartVoice" },
{
      addr: 2148145744, // 0x800A1A50
      type: "code",
      name: "alSynSetPitch" },
{
      addr: 2148145888, // 0x800A1AE0
      type: "code",
      name: "alSynSetVol" },
{
      addr: 2148146080, // 0x800A1BA0
      type: "code",
      name: "alSynSetFXMix" },
{
      addr: 2148146240, // 0x800A1C40
      type: "code",
      name: "alSynAllocFX" },
{
      addr: 2148146400, // 0x800A1CE0
      type: "code",
      name: "alCents2Ratio" },
{
      addr: 2148146496, // 0x800A1D40
      type: "code",
      name: "osInvalDCache" },
{
      addr: 2148146672, // 0x800A1DF0
      type: "code",
      name: "osInvalICache" },
{
      addr: 2148146800, // 0x800A1E70
      type: "code",
      name: "osWritebackDCache" },
{
      addr: 2148146928, // 0x800A1EF0
      type: "code",
      name: "osWritebackDCacheAll" },
{
      addr: 2148146976, // 0x800A1F20
      type: "code",
      name: "osContGetReadData" },
{
      addr: 2148147132, // 0x800A1FBC
      type: "code",
      name: "osContStartReadData" },
{
      addr: 2148147268, // 0x800A2044
      type: "code",
      name: "__contreaddata_o_0028" },
{
      addr: 2148148336, // 0x800A2470
      type: "code",
      name: "osVirtualToPhysical" },
{
      addr: 2148148432, // 0x800A24D0
      type: "code",
      name: "cosf" },
{
      addr: 2148148768, // 0x800A2620
      type: "code",
      name: "guLookAt" },
{
      addr: 2148149668, // 0x800A29A4
      type: "code",
      name: "guLookAtF" },
{
      addr: 2148150576, // 0x800A2D30
      type: "code",
      name: "guLookAtHilite" },
{
      addr: 2148150788, // 0x800A2E04
      type: "code",
      name: "guLookAtHiliteF" },
{
      addr: 2148153232, // 0x800A3790
      type: "code",
      name: "guLookAtReflect" },
{
      addr: 2148153340, // 0x800A37FC
      type: "code",
      name: "guLookAtReflectF" },
{
      addr: 2148154924, // 0x800A3E2C
      type: "code",
      name: "guMtxCatF" },
{
      addr: 2148155152, // 0x800A3F10
      type: "code",
      name: "guMtxXFML" },
{
      addr: 2148155292, // 0x800A3F9C
      type: "code",
      name: "guMtxCatL" },
{
      addr: 2148155408, // 0x800A4010
      type: "code",
      name: "guMtxF2L" },
{
      addr: 2148155560, // 0x800A40A8
      type: "code",
      name: "guMtxL2F" },
{
      addr: 2148155648, // 0x800A4100
      type: "code",
      name: "guMtxIdentF" },
{
      addr: 2148155728, // 0x800A4150
      type: "code",
      name: "guMtxIdentF" },
{
      addr: 2148156048, // 0x800A4290
      type: "code",
      name: "guOrtho" },
{
      addr: 2148156380, // 0x800A43DC
      type: "code",
      name: "guOrthoF" },
{
      addr: 2148156688, // 0x800A4510
      type: "code",
      name: "guPerspective" },
{
      addr: 2148157144, // 0x800A46D8
      type: "code",
      name: "guPerspectiveF" },
{
      addr: 2148157584, // 0x800A4890
      type: "code",
      name: "guRandom",
      desc: "Generates a pseudo-random number" },
{
      addr: 2148157632, // 0x800A48C0
      type: "code",
      name: "guRotate" },
{
      addr: 2148158008, // 0x800A4A38
      type: "code",
      name: "guRotateF" },
{
      addr: 2148158368, // 0x800A4BA0
      type: "code",
      name: "guRotateRPY" },
{
      addr: 2148158764, // 0x800A4D2C
      type: "code",
      name: "guRotateRPYF" },
{
      addr: 2148159168, // 0x800A4EC0
      type: "code",
      name: "guScale" },
{
      addr: 2148159292, // 0x800A4F3C
      type: "code",
      name: "guScaleF" },
{
      addr: 2148159392, // 0x800A4FA0
      type: "code",
      name: "sinf" },
{
      addr: 2148159808, // 0x800A5140
      type: "code",
      name: "guTranslate" },
{
      addr: 2148159920, // 0x800A51B0
      type: "code",
      name: "guTranslateF" },
{
      addr: 2148160016, // 0x800A5210
      type: "code",
      name: "bcopy" },
{
      addr: 2148160816, // 0x800A5530
      type: "code",
      name: "bzero" },
{
      addr: 2148160976, // 0x800A55D0
      type: "code",
      name: "memcpy" },
{
      addr: 2148161016, // 0x800A55F8
      type: "code",
      name: "strlen" },
{
      addr: 2148161040, // 0x800A5610
      type: "code",
      name: "strlen" },
{
      addr: 2148161052, // 0x800A561C
      type: "code",
      name: "strchr" },
{
      addr: 2148161076, // 0x800A5634
      type: "code",
      name: "memcpy" },
{
      addr: 2148161120, // 0x800A5660
      type: "code",
      name: "sprintf" },
{
      addr: 2148161264, // 0x800A56F0
      type: "code",
      name: "rmonPrintf",
      desc: "no-op in released ROM" },
{
      addr: 2148161284, // 0x800A5704
      type: "code",
      name: "osSyncPrintf",
      desc: "no-op in released ROM" },
{
      addr: 2148161312, // 0x800A5720
      type: "code",
      name: "osCreateMesgQueue" },
{
      addr: 2148161360, // 0x800A5750
      type: "code",
      name: "osJamMesg" },
{
      addr: 2148161680, // 0x800A5890
      type: "code",
      name: "osRecvMesg" },
{
      addr: 2148161984, // 0x800A59C0
      type: "code",
      name: "osSendMesg" },
{
      addr: 2148162288, // 0x800A5AF0
      type: "code",
      name: "osSetEventMesg" },
{
      addr: 2148162464, // 0x800A5BA0
      type: "code",
      name: "__osSetCause" },
{
      addr: 2148162480, // 0x800A5BB0
      type: "code",
      name: "__osSetCompare" },
{
      addr: 2148162496, // 0x800A5BC0
      type: "code",
      name: "__osSetCount" },
{
      addr: 2148162512, // 0x800A5BD0
      type: "code",
      name: "__osSetSR" },
{
      addr: 2148162528, // 0x800A5BE0
      type: "code",
      name: "osSpTaskStartGo" },
{
      addr: 2148162572, // 0x800A5C0C
      type: "code",
      name: "osSpTaskLoad" },
{
      addr: 2148163104, // 0x800A5E20
      type: "code",
      name: "osSpTaskYield" },
{
      addr: 2148163136, // 0x800A5E40
      type: "code",
      name: "osSpTaskYielded" },
{
      addr: 2148163216, // 0x800A5E90
      type: "code",
      name: "__osSiRawStartDma" },
{
      addr: 2148163476, // 0x800A5F94
      type: "code",
      name: "__osSiGetAccess" },
{
      addr: 2148163584, // 0x800A6000
      type: "code",
      name: "__osSiRelAccess" },
{
      addr: 2148163632, // 0x800A6030
      type: "code",
      name: "osCreateThread" },
{
      addr: 2148164064, // 0x800A61E0
      type: "code",
      name: "osGetThreadPri" },
{
      addr: 2148164096, // 0x800A6200
      type: "code",
      name: "osSetThreadPri" },
{
      addr: 2148164304, // 0x800A62D0
      type: "code",
      name: "osStartThread" },
{
      addr: 2148164592, // 0x800A63F0
      type: "code",
      name: "osStopThread" },
{
      addr: 2148164784, // 0x800A64B0
      type: "code",
      name: "__osDequeueThread" },
{
      addr: 2148164836, // 0x800A64E4
      type: "code",
      name: "__osFaultedThread" },
{
      addr: 2148164840, // 0x800A64E8
      type: "code",
      name: "__osRunningThread" },
{
      addr: 2148164844, // 0x800A64EC
      type: "code",
      name: "__osActiveQueue" },
{
      addr: 2148164848, // 0x800A64F0
      type: "code",
      name: "osYieldThread" },
{
      addr: 2148164852, // 0x800A64F4
      type: "code",
      name: "__osThreadTail" },
{
      addr: 2148164928, // 0x800A6540
      type: "code",
      name: "osGetTime" },
{
      addr: 2148165072, // 0x800A65D0
      type: "code",
      name: "osSetTimer" },
{
      addr: 2148165632, // 0x800A6800
      type: "code",
      name: "__osSetTimerIntr" },
{
      addr: 2148165728, // 0x800A6860
      type: "code",
      name: "__osInsertTimer" },
{
      addr: 2148166000, // 0x800A6970
      type: "code",
      name: "__osProbeTLB" },
{
      addr: 2148166192, // 0x800A6A30
      type: "code",
      name: "osViGetCurrentFramebuffer" },
{
      addr: 2148167152, // 0x800A6DF0
      type: "code",
      name: "osViSetEvent" },
{
      addr: 2148167248, // 0x800A6E50
      type: "code",
      name: "osViSetMode" },
{
      addr: 2148167328, // 0x800A6EA0
      type: "code",
      name: "osViSetSpecialFeatures" },
{
      addr: 2148167696, // 0x800A7010
      type: "code",
      name: "osViSetYScale" },
{
      addr: 2148167776, // 0x800A7060
      type: "code",
      name: "osViSwapBuffer" },
{
      addr: 2148167856, // 0x800A70B0
      type: "code",
      name: "__osViSwapContext" },
{
      addr: 2148168640, // 0x800A73C0
      type: "code",
      name: "osViBlack" },
{
      addr: 2148168736, // 0x800A7420
      type: "code",
      name: "osMotorInit" },
{
      addr: 2148169320, // 0x800A7668
      type: "code",
      name: "__osMotorAccess" },
{
      addr: 2148169648, // 0x800A77B0
      type: "code",
      name: "__osPfsSelectBank" },
{
      addr: 2148169760, // 0x800A7820
      type: "code",
      name: "__osContRamRead" },
{
      addr: 2148170248, // 0x800A7A08
      type: "code",
      name: "__osPfsLastChannel" },
{
      addr: 2148170256, // 0x800A7A10
      type: "code",
      name: "__osContRamWrite" },
{
      addr: 2148170880, // 0x800A7C80
      type: "code",
      name: "osAfterPreNMI" },
{
      addr: 2148170912, // 0x800A7CA0
      type: "code",
      name: "osGetMemSize" },
{
      addr: 2148171824, // 0x800A8030
      type: "code",
      name: "osEepromRead" },
{
      addr: 2148172232, // 0x800A81C8
      type: "code",
      name: "__conteepread_o_00A8" },
{
      addr: 2148172368, // 0x800A8250
      type: "code",
      name: "__osSetGlobalIntMask" },
{
      addr: 2148172432, // 0x800A8290
      type: "code",
      name: "__osResetGlobalIntMask" },
{
      addr: 2148172512, // 0x800A82E0
      type: "code",
      name: "__osPiRawStartDma" },
{
      addr: 2148172720, // 0x800A83B0
      type: "code",
      name: "osPiGetCmdQueue" },
{
      addr: 2148172752, // 0x800A83D0
      type: "code",
      name: "__osEPiRawReadIo" },
{
      addr: 2148173104, // 0x800A8530
      type: "code",
      name: "alHeapCheck" },
{
      addr: 2148173120, // 0x800A8540
      type: "code",
      name: "__osEPiRawWriteIo" },
{
      addr: 2148173488, // 0x800A86B0
      type: "code",
      name: "__osAiDeviceBusy" },
{
      addr: 2148173520, // 0x800A86D0
      type: "code",
      name: "_init_lpfilter" },
{
      addr: 2148173684, // 0x800A8774
      type: "code",
      name: "alFxNew" },
{
      addr: 2148174860, // 0x800A8C0C
      type: "code",
      name: "alEnvmixerNew" },
{
      addr: 2148175044, // 0x800A8CC4
      type: "code",
      name: "alLoadNew" },
{
      addr: 2148175220, // 0x800A8D74
      type: "code",
      name: "alResampleNew" },
{
      addr: 2148175360, // 0x800A8E00
      type: "code",
      name: "alAuxBusNew" },
{
      addr: 2148175452, // 0x800A8E5C
      type: "code",
      name: "alMainBusNew" },
{
      addr: 2148175544, // 0x800A8EB8
      type: "code",
      name: "alSaveNew" },
{
      addr: 2148175616, // 0x800A8F00
      type: "code",
      name: "alLoadParam" },
{
      addr: 2148176044, // 0x800A90AC
      type: "code",
      name: "alRaw16Pull" },
{
      addr: 2148176968, // 0x800A9448
      type: "code",
      name: "alAdpcmPull" },
{
      addr: 2148177632, // 0x800A96E0
      type: "code",
      name: "alLoadParam" },
{
      addr: 2148178060, // 0x800A988C
      type: "code",
      name: "__load_o_0108" },
{
      addr: 2148178448, // 0x800A9A10
      type: "code",
      name: "alAuxBusParam" },
{
      addr: 2148178496, // 0x800A9A40
      type: "code",
      name: "alAuxBusPull" },
{
      addr: 2148178668, // 0x800A9AEC
      type: "code",
      name: "alAuxBusParam" },
{
      addr: 2148178720, // 0x800A9B20
      type: "code",
      name: "_ldexpf" },
{
      addr: 2148178756, // 0x800A9B44
      type: "code",
      name: "_frexpf" },
{
      addr: 2148178980, // 0x800A9C24
      type: "code",
      name: "alEnvmixerParam" },
{
      addr: 2148179192, // 0x800A9CF8
      type: "code",
      name: "alEnvmixerPull" },
{
      addr: 2148180000, // 0x800AA020
      type: "code",
      name: "alEnvmixerParam" },
{
      addr: 2148180212, // 0x800AA0F4
      type: "code",
      name: "__env_o_01E0" },
{
      addr: 2148181196, // 0x800AA4CC
      type: "code",
      name: "__env_o_0718" },
{
      addr: 2148181836, // 0x800AA74C
      type: "code",
      name: "__env_o_027C" },
{
      addr: 2148181968, // 0x800AA7D0
      type: "code",
      name: "alFilterNew" },
{
      addr: 2148182000, // 0x800AA7F0
      type: "code",
      name: "alMainBusParam" },
{
      addr: 2148182048, // 0x800AA820
      type: "code",
      name: "alMainBusPull" },
{
      addr: 2148182320, // 0x800AA930
      type: "code",
      name: "alMainBusParam" },
{
      addr: 2148182368, // 0x800AA960
      type: "code",
      name: "alResampleParam" },
{
      addr: 2148182560, // 0x800AAA20
      type: "code",
      name: "alResamplePull" },
{
      addr: 2148182860, // 0x800AAB4C
      type: "code",
      name: "alResampleParam" },
{
      addr: 2148183056, // 0x800AAC10
      type: "code",
      name: "_doModFunc" },
{
      addr: 2148183196, // 0x800AAC9C
      type: "code",
      name: "alFxParamHdl" },
{
      addr: 2148183692, // 0x800AAE8C
      type: "code",
      name: "alFxParam" },
{
      addr: 2148183712, // 0x800AAEA0
      type: "code",
      name: "_filterBuffer" },
{
      addr: 2148183868, // 0x800AAF3C
      type: "code",
      name: "_loadOutputBuffer" },
{
      addr: 2148183940, // 0x800AAF84
      type: "code",
      name: "alFxParam" },
{
      addr: 2148184404, // 0x800AB154
      type: "code",
      name: "_loadBuffer" },
{
      addr: 2148184456, // 0x800AB188
      type: "code",
      name: "__reverb_o_0178" },
{
      addr: 2148184772, // 0x800AB2C4
      type: "code",
      name: "_saveBuffer" },
{
      addr: 2148184992, // 0x800AB3A0
      type: "code",
      name: "__reverb_o_0154" },
{
      addr: 2148185140, // 0x800AB434
      type: "code",
      name: "alFxPull" },
{
      addr: 2148185360, // 0x800AB510
      type: "code",
      name: "__reverb_o_00C4" },
{
      addr: 2148185728, // 0x800AB680
      type: "code",
      name: "__reverb_o_024C" },
{
      addr: 2148185884, // 0x800AB71C
      type: "code",
      name: "__reverb_o_05D0" },
{
      addr: 2148186032, // 0x800AB7B0
      type: "code",
      name: "alSaveParam" },
{
      addr: 2148186072, // 0x800AB7D8
      type: "code",
      name: "alSavePull" },
{
      addr: 2148186200, // 0x800AB858
      type: "code",
      name: "alSaveParam" },
{
      addr: 2148186240, // 0x800AB880
      type: "code",
      name: "__resetPerfChanState" },
{
      addr: 2148186368, // 0x800AB900
      type: "code",
      name: "__setInstChanState" },
{
      addr: 2148186452, // 0x800AB954
      type: "code",
      name: "__lookupVoice" },
{
      addr: 2148186536, // 0x800AB9A8
      type: "code",
      name: "__vsPan" },
{
      addr: 2148186604, // 0x800AB9EC
      type: "code",
      name: "__mapVoice" },
{
      addr: 2148186684, // 0x800ABA3C
      type: "code",
      name: "__lookupSoundQuick" },
{
      addr: 2148186896, // 0x800ABB10
      type: "code",
      name: "__initFromBank" },
{
      addr: 2148187068, // 0x800ABBBC
      type: "code",
      name: "__seqpReleaseVoice" },
{
      addr: 2148187360, // 0x800ABCE0
      type: "code",
      name: "__voiceNeedsNoteKill" },
{
      addr: 2148187536, // 0x800ABD90
      type: "code",
      name: "__postNextSeqEvent" },
{
      addr: 2148187744, // 0x800ABE60
      type: "code",
      name: "__vsDelta" },
{
      addr: 2148187772, // 0x800ABE7C
      type: "code",
      name: "__vsVol" },
{
      addr: 2148187864, // 0x800ABED8
      type: "code",
      name: "__seqplayer_o_0420" },
{
      addr: 2148187884, // 0x800ABEEC
      type: "code",
      name: "__unmapVoice" },
{
      addr: 2148187984, // 0x800ABF50
      type: "code",
      name: "__seqpStopOsc" },
{
      addr: 2148188072, // 0x800ABFA8
      type: "code",
      name: "__seqplayer_o_01DC" },
{
      addr: 2148188224, // 0x800AC040
      type: "code",
      name: "__initChanState" },
{
      addr: 2148188404, // 0x800AC0F4
      type: "code",
      name: "alSeqpNew" },
{
      addr: 2148188584, // 0x800AC1A8
      type: "code",
      name: "__seqplayer_o_03EC" },
{
      addr: 2148190672, // 0x800AC9D0
      type: "code",
      name: "__seqplayer_o_0400" },
{
      addr: 2148190780, // 0x800ACA3C
      type: "code",
      name: "__seqplayer_o_0A54" },
{
      addr: 2148190860, // 0x800ACA8C
      type: "code",
      name: "__seqplayer_o_0244" },
{
      addr: 2148190960, // 0x800ACAF0
      type: "code",
      name: "__seqplayer_o_0D18" },
{
      addr: 2148191044, // 0x800ACB44
      type: "code",
      name: "__seqplayer_o_0A1C" },
{
      addr: 2148191256, // 0x800ACC18
      type: "code",
      name: "__seqplayer_o_0284" },
{
      addr: 2148191368, // 0x800ACC88
      type: "code",
      name: "__seqplayer_o_0320" },
{
      addr: 2148191396, // 0x800ACCA4
      type: "code",
      name: "__seqplayer_o_0C7C" },
{
      addr: 2148191464, // 0x800ACCE8
      type: "code",
      name: "__seqplayer_o_04F8" },
{
      addr: 2148191756, // 0x800ACE0C
      type: "code",
      name: "__seqplayer_o_04E0" },
{
      addr: 2148191932, // 0x800ACEBC
      type: "code",
      name: "__seqplayer_o_0600" },
{
      addr: 2148192104, // 0x800ACF68
      type: "code",
      name: "__seqplayer_o_107C" },
{
      addr: 2148192188, // 0x800ACFBC
      type: "code",
      name: "__seqplayer_o_167C" },
{
      addr: 2148192316, // 0x800AD03C
      type: "code",
      name: "__seqplayer_o_00BC" },
{
      addr: 2148192496, // 0x800AD0F0
      type: "code",
      name: "__seqplayer_o_0238" },
{
      addr: 2148192736, // 0x800AD1E0
      type: "code",
      name: "__seqplayer_o_05D8" },
{
      addr: 2148192800, // 0x800AD220
      type: "code",
      name: "alSynSetPriority" },
{
      addr: 2148192816, // 0x800AD230
      type: "code",
      name: "sqrtf",
      desc: "SQRT.S F0" },
{
      addr: 2148195664, // 0x800ADD50
      type: "code",
      name: "osGetCount" },
{
      addr: 2148195728, // 0x800ADD90
      type: "code",
      name: "__osSpDeviceBusy" },
{
      addr: 2148195760, // 0x800ADDB0
      type: "code",
      name: "__osSpGetStatus" },
{
      addr: 2148195776, // 0x800ADDC0
      type: "code",
      name: "__osSpSetStatus" },
{
      addr: 2148195792, // 0x800ADDD0
      type: "code",
      name: "__osSpSetPc" },
{
      addr: 2148195840, // 0x800ADE00
      type: "code",
      name: "__osSpRawStartDma" },
{
      addr: 2148195984, // 0x800ADE90
      type: "code",
      name: "__osSpRawReadIo" },
{
      addr: 2148196064, // 0x800ADEE0
      type: "code",
      name: "__osSpRawWriteIo" },
{
      addr: 2148196144, // 0x800ADF30
      type: "code",
      name: "__osContDataCrc" },
{
      addr: 2148196252, // 0x800ADF9C
      type: "code",
      name: "__osContDataCrc" },
{
      addr: 2148196268, // 0x800ADFAC
      type: "code",
      name: "__osContAddressCrc" },
{
      addr: 2148196848, // 0x800AE1F0
      type: "code",
      name: "__osPfsGetInitData" },
{
      addr: 2148197028, // 0x800AE2A4
      type: "code",
      name: "__osPfsRequestData" },
{
      addr: 2148197192, // 0x800AE348
      type: "code",
      name: "__osPfsPifRam" },
{
      addr: 2148197228, // 0x800AE36C
      type: "code",
      name: "__pfsisplug_o_004C" },
{
      addr: 2148197256, // 0x800AE388
      type: "code",
      name: "osPfsIsPlug" },
{
      addr: 2148197392, // 0x800AE410
      type: "code",
      name: "__pfsisplug_o_0094" },
{
      addr: 2148197584, // 0x800AE4D0
      type: "code",
      name: "__osPfsGetOneChannelData" },
{
      addr: 2148197712, // 0x800AE550
      type: "code",
      name: "__osPfsRequestOneChannel" },
{
      addr: 2148197824, // 0x800AE5C0
      type: "code",
      name: "__pfsgetstatus_o_0030" },
{
      addr: 2148197860, // 0x800AE5E4
      type: "code",
      name: "__osPfsGetStatus" },
{
      addr: 2148197972, // 0x800AE654
      type: "code",
      name: "__pfsgetstatus_o_0084" },
{
      addr: 2148198112, // 0x800AE6E0
      type: "code",
      name: "__osPfsInodeCache" },
{
      addr: 2148198232, // 0x800AE758
      type: "code",
      name: "__contpfs_o_0598" },
{
      addr: 2148198368, // 0x800AE7E0
      type: "code",
      name: "__osPfsRWInode" },
{
      addr: 2148198980, // 0x800AEA44
      type: "code",
      name: "__contpfs_o_0578" },
{
      addr: 2148199192, // 0x800AEB18
      type: "code",
      name: "__osCheckId" },
{
      addr: 2148199376, // 0x800AEBD0
      type: "code",
      name: "__osGetId" },
{
      addr: 2148199836, // 0x800AED9C
      type: "code",
      name: "__osCheckPackId" },
{
      addr: 2148200192, // 0x800AEF00
      type: "code",
      name: "__osRepairPackId" },
{
      addr: 2148202608, // 0x800AF870
      type: "code",
      name: "_Litob" },
{
      addr: 2148203200, // 0x800AFAC0
      type: "code",
      name: "_Ldtob" },
{
      addr: 2148204300, // 0x800AFF0C
      type: "code",
      name: "__xldtob_o_0080" },
{
      addr: 2148204452, // 0x800AFFA4
      type: "code",
      name: "__xldtob_o_0414" },
{
      addr: 2148205904, // 0x800B0550
      type: "code",
      name: "__osSpDeviceBusy" },
{
      addr: 2148209696, // 0x800B1420
      type: "code",
      name: "__divdi3" },
{
      addr: 2148210064, // 0x800B1590
      type: "code",
      name: "__udivdi3" },
{
      addr: 2148210096, // 0x800B15B0
      type: "code",
      name: "__umoddi3" },
{
      addr: 2148305012, // 0x800C8874
      type: "data",
      name: "overlay_table" },
{
      addr: 2148319248, // 0x800CC010
      type: "data",
      name: "item_function_pointers",
      desc: "u32[10]" },
{
      addr: 2148397008, // 0x800DEFD0
      type: "data",
      name: "perm_heap_addr",
      desc: "Address of permanent heap" },
{
      addr: 2148397024, // 0x800DEFE0
      type: "data",
      name: "temp_heap_addr",
      desc: "Address of temporary heap" },
{
      addr: 2148407504, // 0x800E18D0
      type: "u16",
      name: "num_board_spaces" },
{
      addr: 2148407506, // 0x800E18D2
      type: "u16",
      name: "num_chains" },
{
      addr: 2148407508, // 0x800E18D4
      type: "u32",
      name: "hydrated_space_data" },
{
      addr: 2148407512, // 0x800E18D8
      type: "u32",
      name: "hydrated_chains" },
{
      addr: 2148407616, // 0x800E1940
      type: "data",
      name: "arrow_angles",
      desc: "f32[8]" },
{
      addr: 2148407648, // 0x800E1960
      type: "u32",
      name: "num_arrow_angles" },
{
      addr: 2148504494, // 0x800F93AE
      type: "u16",
      name: "total_turns" },
{
      addr: 2148504496, // 0x800F93B0
      type: "u16",
      name: "current_turn" },
{
      addr: 2148509246, // 0x800FA63E
      type: "u16",
      name: "scene",
      desc: "Current scene number" },
{
      addr: 2148520644, // 0x800FD2C4
      type: "u8",
      name: "p1_char",
      desc: "00=Mario" },
{
      addr: 2148520648, // 0x800FD2C8
      type: "u16",
      name: "p1_coins",
      desc: "Player 1 coin count" },
{
      addr: 2148520654, // 0x800FD2CE
      type: "u16",
      name: "p1_stars",
      desc: "Player 1 star count" },
{
      addr: 2148520656, // 0x800FD2D0
      type: "u16",
      name: "p1_cur_chain_index",
      desc: "Player 1 current chain index" },
{
      addr: 2148520658, // 0x800FD2D2
      type: "u16",
      name: "p1_cur_space_index",
      desc: "Player 1 current space index" },
{
      addr: 2148520660, // 0x800FD2D4
      type: "u16",
      name: "p1_next_chain_index",
      desc: "Player 1 next chain index" },
{
      addr: 2148520662, // 0x800FD2D6
      type: "u16",
      name: "p1_next_space_index",
      desc: "Player 1 next space index" },
{
      addr: 2148520665, // 0x800FD2D9
      type: "u8",
      name: "p1_item",
      desc: "Player 1 item" },
{
      addr: 2148520666, // 0x800FD2DA
      type: "u16",
      name: "p1_turn_status",
      desc: "Player 1 turn status" },
{
      addr: 2148520696, // 0x800FD2F8
      type: "u8",
      name: "p2_char",
      desc: "00=Mario" },
{
      addr: 2148520700, // 0x800FD2FC
      type: "u16",
      name: "p2_coins",
      desc: "Player 2 coin count" },
{
      addr: 2148520706, // 0x800FD302
      type: "u16",
      name: "p2_stars",
      desc: "Player 2 star count" },
{
      addr: 2148520708, // 0x800FD304
      type: "u16",
      name: "p2_cur_chain_index",
      desc: "Player 2 current chain index" },
{
      addr: 2148520710, // 0x800FD306
      type: "u16",
      name: "p2_cur_space_index",
      desc: "Player 2 current space index" },
{
      addr: 2148520712, // 0x800FD308
      type: "u16",
      name: "p2_next_chain_index",
      desc: "Player 2 next chain index" },
{
      addr: 2148520714, // 0x800FD30A
      type: "u16",
      name: "p2_next_space_index",
      desc: "Player 2 next space index" },
{
      addr: 2148520717, // 0x800FD30D
      type: "u8",
      name: "p2_item",
      desc: "Player 2 item" },
{
      addr: 2148520718, // 0x800FD30E
      type: "u16",
      name: "p2_turn_status",
      desc: "Player 2 turn status" },
{
      addr: 2148520748, // 0x800FD32C
      type: "u8",
      name: "p3_char",
      desc: "00=Mario" },
{
      addr: 2148520752, // 0x800FD330
      type: "u16",
      name: "p3_coins",
      desc: "Player 3 coin count" },
{
      addr: 2148520758, // 0x800FD336
      type: "u16",
      name: "p3_stars",
      desc: "Player 3 star count" },
{
      addr: 2148520769, // 0x800FD341
      type: "u8",
      name: "p3_item",
      desc: "Player 3 item" },
{
      addr: 2148520770, // 0x800FD342
      type: "u16",
      name: "p3_turn_statu",
      desc: "Player 3 turn status" },
{
      addr: 2148520800, // 0x800FD360
      type: "u8",
      name: "p4_char",
      desc: "00=Mario" },
{
      addr: 2148520804, // 0x800FD364
      type: "u16",
      name: "p4_coins",
      desc: "Player 4 coin count" },
{
      addr: 2148520810, // 0x800FD36A
      type: "u16",
      name: "p4_stars",
      desc: "Player 4 star count" },
{
      addr: 2148520821, // 0x800FD375
      type: "u8",
      name: "p4_item",
      desc: "Player 4 item" },
{
      addr: 2148520822, // 0x800FD376
      type: "u16",
      name: "p4_turn_status",
      desc: "Player 4 turn status" },
{
      addr: 2148520984, // 0x800FD418
      type: "u16",
      name: "hidden_space_primary",
      desc: "space index of primary hidden space" }
];
