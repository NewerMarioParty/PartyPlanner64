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
      addr: 2147567024, // 0x800145B0
      type: "code",
      name: "ReadMainFS",
      desc: "Reads file from MainFS" },
{
      addr: 2147567408, // 0x80014730
      type: "code",
      name: "FreeMainFS",
      desc: "Free's an allocated MainFS file pointer" },
{
      addr: 2147578972, // 0x8001745C
      type: "code",
      name: "DMA",
      desc: "A0=rom_addr" },
{
      addr: 2147579176, // 0x80017528
      type: "code",
      name: "LoadFormFile",
      desc: "A0=main_fs_DDDDFFFF" },
{
      addr: 2147579276, // 0x8001758C
      type: "code",
      name: "GetRandomByte" },
{
      addr: 2147579328, // 0x800175C0
      type: "code",
      name: "LoadOverlay",
      desc: "A0=overlay_index" },
{
      addr: 2147584272, // 0x80018910
      type: "code",
      name: "InitSprite",
      desc: "A0=u32 file_id DDDDFFFF" },
{
      addr: 2147585104, // 0x80018C50
      type: "code",
      name: "ShowBasicSprite",
      desc: "A0=u16 basic_sprite_index" },
{
      addr: 2147585148, // 0x80018C7C
      type: "code",
      name: "HideBasicSprite",
      desc: "A0=u16 basic_sprite_index" },
{
      addr: 2147585232, // 0x80018CD0
      type: "code",
      name: "SetBasicSpritePos",
      desc: "A0=u16 basic_sprite_index" },
{
      addr: 2147585816, // 0x80018F18
      type: "code",
      name: "SetBasicSpriteSize",
      desc: "A0=u16 basic_sprite_index" },
{
      addr: 2147586144, // 0x80019060
      type: "code",
      name: "InitBasicSprite",
      desc: "A0=short sprite_index" },
{
      addr: 2147594896, // 0x8001B290
      type: "code",
      name: "ParseObjType10",
      desc: "Parse OBJ1 type 0x10" },
{
      addr: 2147599080, // 0x8001C2E8
      type: "code",
      name: "FindFormEntry",
      desc: "Finds a FORM entry. A0=entry type (like \"OBJ1\")" },
{
      addr: 2147603008, // 0x8001D240
      type: "code",
      name: "InitCameras",
      desc: "A0=int cameras count" },
{
      addr: 2147604788, // 0x8001D934
      type: "code",
      name: "Convert3DTo2D",
      desc: "A0=3 point vector" },
{
      addr: 2147630100, // 0x80023C14
      type: "code",
      name: "LoadFormBinary",
      desc: "A0=form_addr" },
{
      addr: 2147726976, // 0x8003B680
      type: "code",
      name: "MakePermHeap",
      desc: "A0=heap_addr" },
{
      addr: 2147727012, // 0x8003B6A4
      type: "code",
      name: "MallocPerm",
      desc: "A0=size" },
{
      addr: 2147727048, // 0x8003B6C8
      type: "code",
      name: "FreePerm",
      desc: "A0=addr" },
{
      addr: 2147727184, // 0x8003B750
      type: "code",
      name: "MakeTempHeap",
      desc: "A0=heap_addr" },
{
      addr: 2147727220, // 0x8003B774
      type: "code",
      name: "MallocTemp",
      desc: "A0=size" },
{
      addr: 2147727256, // 0x8003B798
      type: "code",
      name: "FreeTemp",
      desc: "A0=addr" },
{
      addr: 2147729740, // 0x8003C14C
      type: "code",
      name: "DirectionPrompt",
      desc: "Prompts player to choose path at branch" },
{
      addr: 2147740080, // 0x8003E9B0
      type: "code",
      name: "RunDecisionTree",
      desc: "A0=decision_tree_pointer" },
{
      addr: 2147768184, // 0x80045778
      type: "code",
      name: "ShowPlayerCoinChange",
      desc: "A0=player_index" },
{
      addr: 2147787668, // 0x8004A394
      type: "code",
      name: "HVQDecode",
      desc: "HVQ image decoder" },
{
      addr: 2147795436, // 0x8004C1EC
      type: "code",
      name: "GetSpaceData",
      desc: "A0=space_index" },
{
      addr: 2147795460, // 0x8004C204
      type: "code",
      name: "GetAbsSpaceIndexFromChainSpaceIndex",
      desc: "A0=chain_index" },
{
      addr: 2147795504, // 0x8004C230
      type: "code",
      name: "GetChainLength",
      desc: "A0=chain_index" },
{
      addr: 2147795532, // 0x8004C24C
      type: "code",
      name: "GetChainSpaceIndexFromAbsSpaceIndex",
      desc: "A0=abs_space_index" },
{
      addr: 2147796108, // 0x8004C48C
      type: "code",
      name: "SetSpaceType",
      desc: "A0=space_index" },
{
      addr: 2147797248, // 0x8004C900
      type: "code",
      name: "EventTableHydrate",
      desc: "Moves event table data into the space data" },
{
      addr: 2147797804, // 0x8004CB2C
      type: "code",
      name: "SetCurrentSpaceIndex",
      desc: "A0=space_index" },
{
      addr: 2147797816, // 0x8004CB38
      type: "code",
      name: "GetCurrentSpaceIndex" },
{
      addr: 2147798640, // 0x8004CE70
      type: "code",
      name: "SwapPlayerLocationData",
      desc: "A0=player_index_1" },
{
      addr: 2147798848, // 0x8004CF40
      type: "code",
      name: "SetPlayerBlue",
      desc: "Sets the player's turn state blue" },
{
      addr: 2147798856, // 0x8004CF48
      type: "code",
      name: "SetPlayerRed",
      desc: "Sets the player's turn state red" },
{
      addr: 2147798864, // 0x8004CF50
      type: "code",
      name: "SetPlayerGreen",
      desc: "Sets the player's turn state green" },
{
      addr: 2147798896, // 0x8004CF70
      type: "code",
      name: "GetSumOfPlayerStars",
      desc: "sums the star count of all players" },
{
      addr: 2147798976, // 0x8004CFC0
      type: "code",
      name: "RNGPercentChance",
      desc: "A0=percent chance the call returns true" },
{
      addr: 2147799048, // 0x8004D008
      type: "code",
      name: "GetTurnsRemaining",
      desc: "Subtracts elapsed turns from total turns" },
{
      addr: 2147801048, // 0x8004D7D8
      type: "code",
      name: "SetPlayerOntoChain",
      desc: "A0=player_index" },
{
      addr: 2147801156, // 0x8004D844
      type: "code",
      name: "SetNextChainAndSpace",
      desc: "A0=player_index" },
{
      addr: 2147801392, // 0x8004D930
      type: "code",
      name: "CreateTextWindow",
      desc: "creates a text window based on upper left x and y coordinate" },
{
      addr: 2147801560, // 0x8004D9D8
      type: "code",
      name: "ShowTextWindow" },
{
      addr: 2147801808, // 0x8004DAD0
      type: "code",
      name: "HideTextWindow" },
{
      addr: 2147802724, // 0x8004DE64
      type: "code",
      name: "WaitForTextConfirmation" },
{
      addr: 2147822208, // 0x80052A80
      type: "code",
      name: "GetCurrentPlayerIndex" },
{
      addr: 2147822220, // 0x80052A8C
      type: "code",
      name: "GetPlayerStruct",
      desc: "A0=player_index pass -1 to get current player's struct" },
{
      addr: 2147822284, // 0x80052ACC
      type: "code",
      name: "PlayerIsCurrent",
      desc: "A0=player_index tests if A0 is the current player" },
{
      addr: 2147822312, // 0x80052AE8
      type: "code",
      name: "PlayerStructIsCurrent",
      desc: "A0=struct player pointer" },
{
      addr: 2147822368, // 0x80052B20
      type: "code",
      name: "PlayerIsCPU",
      desc: "A0=player_index" },
{
      addr: 2147822408, // 0x80052B48
      type: "code",
      name: "AdjustPlayerCoins",
      desc: "A0=player_index" },
{
      addr: 2147822520, // 0x80052BB8
      type: "code",
      name: "PlayerHasCoins",
      desc: "A0=player_index" },
{
      addr: 2147823648, // 0x80053020
      type: "code",
      name: "ClearPlayer0x20",
      desc: "clears all 0x20 entries in player structs" },
{
      addr: 2147834208, // 0x80055960
      type: "code",
      name: "AdjustPlayerCoinsGradual",
      desc: "A0=player_index" },
{
      addr: 2147845968, // 0x80058750
      type: "code",
      name: "ExecBoardScene",
      desc: "A0=board_fns" },
{
      addr: 2147850136, // 0x80059798
      type: "code",
      name: "IsBoardFeatureFlagSet" },
{
      addr: 2147850204, // 0x800597DC
      type: "code",
      name: "SetBoardFeatureFlag",
      desc: "A0=feature" },
{
      addr: 2147850284, // 0x8005982C
      type: "code",
      name: "ClearBoardFeatureFlag",
      desc: "A0=feature" },
{
      addr: 2147850368, // 0x80059880
      type: "code",
      name: "MakeHeap",
      desc: "A0=addr" },
{
      addr: 2147850400, // 0x800598A0
      type: "code",
      name: "Malloc",
      desc: "A0=heap pointer (main or temp)" },
{
      addr: 2147850540, // 0x8005992C
      type: "code",
      name: "Free",
      desc: "A0=allocated heap pointer" },
{
      addr: 2147851008, // 0x80059B00
      type: "code",
      name: "Ensure16",
      desc: "A0=num" },
{
      addr: 2147858488, // 0x8005B838
      type: "code",
      name: "FreeString",
      desc: "A0=*str" },
{
      addr: 2147864368, // 0x8005CF30
      type: "code",
      name: "InitObjectSystem",
      desc: "A0=int max_objects" },
{
      addr: 2147867688, // 0x8005DC28
      type: "code",
      name: "InitProcess",
      desc: "A0=fn" },
{
      addr: 2147868048, // 0x8005DD90
      type: "code",
      name: "EndProcess" },
{
      addr: 2147877548, // 0x800602AC
      type: "code",
      name: "PlaySound",
      desc: "A0=index" },
{
      addr: 2147885756, // 0x800622BC
      type: "code",
      name: "DrawDebugText",
      desc: "A0=x_pos" },
{
      addr: 2147890512, // 0x80063550
      type: "code",
      name: "SleepProcess" },
{
      addr: 2147890612, // 0x800635B4
      type: "code",
      name: "SleepVProcess" },
{
      addr: 2147932120, // 0x8006D7D8
      type: "code",
      name: "LoadStringIntoWindow",
      desc: "A0=window_id" },
{
      addr: 2147934320, // 0x8006E070
      type: "code",
      name: "SetTextCharsPerFrame",
      desc: "A0=window_id" },
{
      addr: 2148005196, // 0x8007F54C
      type: "code",
      name: "HVQDecodeInner",
      desc: "HVQ image decoder" },
{
      addr: 2148007236, // 0x8007FD44
      type: "code",
      name: "__leoCommand" },
{
      addr: 2148010448, // 0x800809D0
      type: "code",
      name: "__leoAnalize_asic_status" },
{
      addr: 2148011632, // 0x80080E70
      type: "code",
      name: "__leoSend_asic_cmd_w" },
{
      addr: 2148011688, // 0x80080EA8
      type: "code",
      name: "__leoSend_asic_cmd_w_nochkDiskChange" },
{
      addr: 2148012004, // 0x80080FE4
      type: "code",
      name: "__leoRecal_w" },
{
      addr: 2148012144, // 0x80081070
      type: "code",
      name: "__leoSeek_w" },
{
      addr: 2148012288, // 0x80081100
      type: "code",
      name: "__leoChk_err_retry" },
{
      addr: 2148012560, // 0x80081210
      type: "code",
      name: "__leoChk_cur_drvmode" },
{
      addr: 2148012832, // 0x80081320
      type: "code",
      name: "__LEOrw_flags" },
{
      addr: 2148012834, // 0x80081322
      type: "code",
      name: "__LEOdma_que" },
{
      addr: 2148012858, // 0x8008133A
      type: "code",
      name: "__LEOPiDmaParam" },
{
      addr: 2148012882, // 0x80081352
      type: "code",
      name: "__LEOtgt_param" },
{
      addr: 2148012894, // 0x8008135E
      type: "code",
      name: "__LEOPiInfo" },
{
      addr: 2148012898, // 0x80081362
      type: "code",
      name: "__LEOasic_seq_ctl_shadow" },
{
      addr: 2148012902, // 0x80081366
      type: "code",
      name: "__leoSet_mseq" },
{
      addr: 2148013268, // 0x800814D4
      type: "code",
      name: "__leoClr_reset" },
{
      addr: 2148013380, // 0x80081544
      type: "code",
      name: "__LEOcommand_que" },
{
      addr: 2148013404, // 0x8008155C
      type: "code",
      name: "__leoClr_queue" },
{
      addr: 2148013552, // 0x800815F0
      type: "code",
      name: "__leoLba_to_phys" },
{
      addr: 2148014484, // 0x80081994
      type: "code",
      name: "LeoReadDiskID" },
{
      addr: 2148014580, // 0x800819F4
      type: "code",
      name: "LeoReadWrite" },
{
      addr: 2148017600, // 0x800825C0
      type: "code",
      name: "osLeoDiskInit" },
{
      addr: 2148017756, // 0x8008265C
      type: "code",
      name: "__osDiskHandle" },
{
      addr: 2148017760, // 0x80082660
      type: "code",
      name: "__LeoDiskHandle" },
{
      addr: 2148018112, // 0x800827C0
      type: "code",
      name: "LeoDriveExist" },
{
      addr: 2148029872, // 0x800855B0
      type: "code",
      name: "sqrtf",
      desc: "of F0 and F12" },
{
      addr: 2148029888, // 0x800855C0
      type: "code",
      name: "cosf" },
{
      addr: 2148030224, // 0x80085710
      type: "code",
      name: "guLookAt",
      desc: "Calculate a 'lookat' view matrix." },
{
      addr: 2148031124, // 0x80085A94
      type: "code",
      name: "guLookAtF",
      desc: "Calculate a 'lookat' view matrix (floating point)" },
{
      addr: 2148032032, // 0x80085E20
      type: "code",
      name: "guLookAtReflect" },
{
      addr: 2148032140, // 0x80085E8C
      type: "code",
      name: "guLookAtReflectF" },
{
      addr: 2148033552, // 0x80086410
      type: "code",
      name: "guLookAtHilite" },
{
      addr: 2148033764, // 0x800864E4
      type: "code",
      name: "guLookAtHiliteF" },
{
      addr: 2148036208, // 0x80086E70
      type: "code",
      name: "guMtxF2L" },
{
      addr: 2148036360, // 0x80086F08
      type: "code",
      name: "guMtxL2F" },
{
      addr: 2148036448, // 0x80086F60
      type: "code",
      name: "guMtxIdentF" },
{
      addr: 2148036528, // 0x80086FB0
      type: "code",
      name: "guMtxIdentF" },
{
      addr: 2148036696, // 0x80087058
      type: "code",
      name: "guMtxF2L" },
{
      addr: 2148036848, // 0x800870F0
      type: "code",
      name: "guMtxXFMF" },
{
      addr: 2148037020, // 0x8008719C
      type: "code",
      name: "guMtxCatF" },
{
      addr: 2148037068, // 0x800871CC
      type: "code",
      name: "guMtxXFMF" },
{
      addr: 2148037248, // 0x80087280
      type: "code",
      name: "guMtxXFML" },
{
      addr: 2148037388, // 0x8008730C
      type: "code",
      name: "guMtxCatL" },
{
      addr: 2148037504, // 0x80087380
      type: "code",
      name: "guOrtho",
      desc: "Calculate a positive projection matrix." },
{
      addr: 2148037836, // 0x800874CC
      type: "code",
      name: "guOrthoF",
      desc: "Calculate a positive projection matrix (floating point)" },
{
      addr: 2148038144, // 0x80087600
      type: "code",
      name: "guPerspective",
      desc: "Calculate a perspective drawing projection matrix." },
{
      addr: 2148038600, // 0x800877C8
      type: "code",
      name: "guPerspectiveF",
      desc: "Calculate a perspective drawing projection matrix (floating point)" },
{
      addr: 2148039040, // 0x80087980
      type: "code",
      name: "guRotate" },
{
      addr: 2148039416, // 0x80087AF8
      type: "code",
      name: "guRotateF" },
{
      addr: 2148039776, // 0x80087C60
      type: "code",
      name: "guRotateRPY" },
{
      addr: 2148040172, // 0x80087DEC
      type: "code",
      name: "guRotateRPYF" },
{
      addr: 2148040576, // 0x80087F80
      type: "code",
      name: "guScale" },
{
      addr: 2148040700, // 0x80087FFC
      type: "code",
      name: "guScaleF" },
{
      addr: 2148040800, // 0x80088060
      type: "code",
      name: "sinf" },
{
      addr: 2148041216, // 0x80088200
      type: "code",
      name: "guTranslate" },
{
      addr: 2148041328, // 0x80088270
      type: "code",
      name: "guTranslateF" },
{
      addr: 2148041424, // 0x800882D0
      type: "code",
      name: "guRandom",
      desc: "Generates a pseudo-random number" },
{
      addr: 2148041472, // 0x80088300
      type: "code",
      name: "osInvalDCache" },
{
      addr: 2148041872, // 0x80088490
      type: "code",
      name: "osSetIntMask" },
{
      addr: 2148042096, // 0x80088570
      type: "code",
      name: "osWritebackDCache" },
{
      addr: 2148042272, // 0x80088620
      type: "code",
      name: "osCreateMesgQueue" },
{
      addr: 2148042320, // 0x80088650
      type: "code",
      name: "osCreateThread" },
{
      addr: 2148042736, // 0x800887F0
      type: "code",
      name: "osGetThreadPri" },
{
      addr: 2148042768, // 0x80088810
      type: "code",
      name: "osGetTime" },
{
      addr: 2148042912, // 0x800888A0
      type: "code",
      name: "osJamMesg" },
{
      addr: 2148043232, // 0x800889E0
      type: "code",
      name: "osRecvMesg" },
{
      addr: 2148043536, // 0x80088B10
      type: "code",
      name: "osSendMesg" },
{
      addr: 2148043840, // 0x80088C40
      type: "code",
      name: "osSetThreadPri" },
{
      addr: 2148044048, // 0x80088D10
      type: "code",
      name: "osStartThread" },
{
      addr: 2148044336, // 0x80088E30
      type: "code",
      name: "osStopThread" },
{
      addr: 2148044528, // 0x80088EF0
      type: "code",
      name: "__osDequeueThread" },
{
      addr: 2148044580, // 0x80088F24
      type: "code",
      name: "__osFaultedThread" },
{
      addr: 2148044584, // 0x80088F28
      type: "code",
      name: "__osRunningThread" },
{
      addr: 2148044588, // 0x80088F2C
      type: "code",
      name: "__osActiveQueue" },
{
      addr: 2148044592, // 0x80088F30
      type: "code",
      name: "__osRunQueue" },
{
      addr: 2148044596, // 0x80088F34
      type: "code",
      name: "__osThreadTail" },
{
      addr: 2148044992, // 0x800890C0
      type: "code",
      name: "__osSetTimerIntr" },
{
      addr: 2148045088, // 0x80089120
      type: "code",
      name: "__osInsertTimer" },
{
      addr: 2148045360, // 0x80089230
      type: "code",
      name: "osVirtualToPhysical",
      desc: "Translates between CPU virtual address/physical memory address" },
{
      addr: 2148045472, // 0x800892A0
      type: "code",
      name: "alBnkfNew",
      desc: "Initializes a bank file" },
{
      addr: 2148045620, // 0x80089334
      type: "code",
      name: "alSeqFileNew" },
{
      addr: 2148045684, // 0x80089374
      type: "code",
      name: "__bnkf_o_0098" },
{
      addr: 2148045856, // 0x80089420
      type: "code",
      name: "__bnkf_o_0118" },
{
      addr: 2148046004, // 0x800894B4
      type: "code",
      name: "__bnkf_o_01D8" },
{
      addr: 2148046092, // 0x8008950C
      type: "code",
      name: "__bnkf_o_0258" },
{
      addr: 2148046192, // 0x80089570
      type: "code",
      name: "alEvtqFlushType" },
{
      addr: 2148046316, // 0x800895EC
      type: "code",
      name: "alEvtqNextEvent" },
{
      addr: 2148046368, // 0x80089620
      type: "code",
      name: "alEvtqFlushstring_num",
      desc: "returns pointer" },
{
      addr: 2148046468, // 0x80089684
      type: "code",
      name: "alEvtqPostEvent" },
{
      addr: 2148046488, // 0x80089698
      type: "code",
      name: "alEvtqPostEvent" },
{
      addr: 2148046756, // 0x800897A4
      type: "code",
      name: "alEvtqNextEvent" },
{
      addr: 2148046856, // 0x80089808
      type: "code",
      name: "alEvtqFlushType" },
{
      addr: 2148046908, // 0x8008983C
      type: "code",
      name: "alEvtqNew" },
{
      addr: 2148047132, // 0x8008991C
      type: "code",
      name: "alLink" },
{
      addr: 2148047164, // 0x8008993C
      type: "code",
      name: "alUnlink" },
{
      addr: 2148047216, // 0x80089970
      type: "code",
      name: "alHeapInit" },
{
      addr: 2148047280, // 0x800899B0
      type: "code",
      name: "alHeapDBAlloc" },
{
      addr: 2148047360, // 0x80089A00
      type: "code",
      name: "alCopy" },
{
      addr: 2148047424, // 0x80089A40
      type: "code",
      name: "alCSeqGetLoc" },
{
      addr: 2148047540, // 0x80089AB4
      type: "code",
      name: "alCSeqSetLoc" },
{
      addr: 2148047656, // 0x80089B28
      type: "code",
      name: "alCSeqNewMarker" },
{
      addr: 2148047692, // 0x80089B4C
      type: "code",
      name: "alCSeqNextEvent" },
{
      addr: 2148047936, // 0x80089C40
      type: "code",
      name: "__alCSeqNextDelta" },
{
      addr: 2148048064, // 0x80089CC0
      type: "code",
      name: "__cseq_o_0194" },
{
      addr: 2148048320, // 0x80089DC0
      type: "code",
      name: "alCSeqGetTicks" },
{
      addr: 2148048328, // 0x80089DC8
      type: "code",
      name: "alCSeqSecToTicks" },
{
      addr: 2148048488, // 0x80089E68
      type: "code",
      name: "alCSeqTicksToSec" },
{
      addr: 2148048612, // 0x80089EE4
      type: "code",
      name: "__alCSeqNextDelta" },
{
      addr: 2148048740, // 0x80089F64
      type: "code",
      name: "alCSeqNextEvent" },
{
      addr: 2148048984, // 0x8008A058
      type: "code",
      name: "alCSeqNew" },
{
      addr: 2148049876, // 0x8008A3D4
      type: "code",
      name: "__cseq_o_02A4" },
{
      addr: 2148050060, // 0x8008A48C
      type: "code",
      name: "__cseq_o_0088" },
{
      addr: 2148050176, // 0x8008A500
      type: "code",
      name: "alSeqpDelete" },
{
      addr: 2148050208, // 0x8008A520
      type: "code",
      name: "alSeqpGetChlFXMix" },
{
      addr: 2148050240, // 0x8008A540
      type: "code",
      name: "alSeqpGetChlPan" },
{
      addr: 2148050272, // 0x8008A560
      type: "code",
      name: "alSeqpGetChlVol" },
{
      addr: 2148050304, // 0x8008A580
      type: "code",
      name: "alSeqpGetChlProgram" },
{
      addr: 2148050432, // 0x8008A600
      type: "code",
      name: "alCSPGetTempo" },
{
      addr: 2148050480, // 0x8008A630
      type: "code",
      name: "alSeqpGetState" },
{
      addr: 2148050496, // 0x8008A640
      type: "code",
      name: "alSeqpPlay" },
{
      addr: 2148050544, // 0x8008A670
      type: "code",
      name: "alSeqpSetBank" },
{
      addr: 2148050592, // 0x8008A6A0
      type: "code",
      name: "alSeqpSetChlFXMix" },
{
      addr: 2148050672, // 0x8008A6F0
      type: "code",
      name: "alSeqpSetSeq" },
{
      addr: 2148050720, // 0x8008A720
      type: "code",
      name: "alSeqpSetTempo" },
{
      addr: 2148050800, // 0x8008A770
      type: "code",
      name: "alSeqpSetVol" },
{
      addr: 2148050848, // 0x8008A7A0
      type: "code",
      name: "alSeqpStop" },
{
      addr: 2148050896, // 0x8008A7D0
      type: "code",
      name: "alSndpDelete" },
{
      addr: 2148050944, // 0x8008A800
      type: "code",
      name: "alSndpAllocate" },
{
      addr: 2148051136, // 0x8008A8C0
      type: "code",
      name: "alSndpDeallocate" },
{
      addr: 2148051216, // 0x8008A910
      type: "code",
      name: "alSndpSetSound" },
{
      addr: 2148051232, // 0x8008A920
      type: "code",
      name: "alSndpPlay" },
{
      addr: 2148051328, // 0x8008A980
      type: "code",
      name: "alSndpGetSound" },
{
      addr: 2148051344, // 0x8008A990
      type: "code",
      name: "alSndpStop" },
{
      addr: 2148051424, // 0x8008A9E0
      type: "code",
      name: "alSndpGetState" },
{
      addr: 2148051456, // 0x8008AA00
      type: "code",
      name: "alSndpSetPitch" },
{
      addr: 2148051536, // 0x8008AA50
      type: "code",
      name: "alSndpSetPriority" },
{
      addr: 2148051584, // 0x8008AA80
      type: "code",
      name: "alSndpSetVol" },
{
      addr: 2148051664, // 0x8008AAD0
      type: "code",
      name: "alSndpSetPan" },
{
      addr: 2148051744, // 0x8008AB20
      type: "code",
      name: "alSndpSetFXMix" },
{
      addr: 2148051824, // 0x8008AB70
      type: "code",
      name: "alSynDelete" },
{
      addr: 2148051840, // 0x8008AB80
      type: "code",
      name: "alSynAddPlayer" },
{
      addr: 2148051920, // 0x8008ABD0
      type: "code",
      name: "alSynRemovePlayer" },
{
      addr: 2148052080, // 0x8008AC70
      type: "code",
      name: "alSynFreeVoice" },
{
      addr: 2148052240, // 0x8008AD10
      type: "code",
      name: "_allocatePVoice" },
{
      addr: 2148052424, // 0x8008ADC8
      type: "code",
      name: "alSynAllocVoice" },
{
      addr: 2148052536, // 0x8008AE38
      type: "code",
      name: "__synallocvoice_o_0048" },
{
      addr: 2148052720, // 0x8008AEF0
      type: "code",
      name: "alSynStopVoice" },
{
      addr: 2148052848, // 0x8008AF70
      type: "code",
      name: "alSynStartVoice" },
{
      addr: 2148053008, // 0x8008B010
      type: "code",
      name: "alSynSetPitch" },
{
      addr: 2148053152, // 0x8008B0A0
      type: "code",
      name: "alSynSetVol" },
{
      addr: 2148053344, // 0x8008B160
      type: "code",
      name: "alCents2Ratio" },
{
      addr: 2148053440, // 0x8008B1C0
      type: "code",
      name: "osAiGetLength" },
{
      addr: 2148053616, // 0x8008B270
      type: "code",
      name: "osSpTaskStartGo" },
{
      addr: 2148053660, // 0x8008B29C
      type: "code",
      name: "osSpTaskLoad" },
{
      addr: 2148054192, // 0x8008B4B0
      type: "code",
      name: "osSpTaskYield" },
{
      addr: 2148054224, // 0x8008B4D0
      type: "code",
      name: "osSpTaskYielded" },
{
      addr: 2148054304, // 0x8008B520
      type: "code",
      name: "osViGetCurrentFramebuffer" },
{
      addr: 2148054432, // 0x8008B5A0
      type: "code",
      name: "osViSetEvent" },
{
      addr: 2148054528, // 0x8008B600
      type: "code",
      name: "osViSetMode" },
{
      addr: 2148054608, // 0x8008B650
      type: "code",
      name: "osViSwapBuffer" },
{
      addr: 2148054688, // 0x8008B6A0
      type: "code",
      name: "osViBlack" },
{
      addr: 2148055664, // 0x8008BA70
      type: "code",
      name: "__osPfsGetInitData" },
{
      addr: 2148055844, // 0x8008BB24
      type: "code",
      name: "__osPfsRequestData" },
{
      addr: 2148056008, // 0x8008BBC8
      type: "code",
      name: "__osPfsPifRam" },
{
      addr: 2148056044, // 0x8008BBEC
      type: "code",
      name: "__pfsisplug_o_004C" },
{
      addr: 2148056072, // 0x8008BC08
      type: "code",
      name: "osPfsIsPlug" },
{
      addr: 2148056208, // 0x8008BC90
      type: "code",
      name: "__pfsisplug_o_0094" },
{
      addr: 2148056400, // 0x8008BD50
      type: "code",
      name: "osEepromLongWrite" },
{
      addr: 2148056640, // 0x8008BE40
      type: "code",
      name: "osEepromLongRead" },
{
      addr: 2148056752, // 0x8008BEB0
      type: "code",
      name: "osEPiStartDma" },
{
      addr: 2148056912, // 0x8008BF50
      type: "code",
      name: "__osPiCreateAccessQueue" },
{
      addr: 2148056952, // 0x8008BF78
      type: "code",
      name: "__osPiGetAccess" },
{
      addr: 2148056996, // 0x8008BFA4
      type: "code",
      name: "__osPiGetAccess" },
{
      addr: 2148057060, // 0x8008BFE4
      type: "code",
      name: "__osPiAccessQueue" },
{
      addr: 2148057084, // 0x8008BFFC
      type: "code",
      name: "__osPiCreateAccessQueue" },
{
      addr: 2148057104, // 0x8008C010
      type: "code",
      name: "__osPiRelAccess" },
{
      addr: 2148057152, // 0x8008C040
      type: "code",
      name: "bcopy" },
{
      addr: 2148057952, // 0x8008C360
      type: "code",
      name: "bzero",
      desc: "Writes all zeroes" },
{
      addr: 2148058112, // 0x8008C400
      type: "code",
      name: "strchr" },
{
      addr: 2148058204, // 0x8008C45C
      type: "code",
      name: "memcpy" },
{
      addr: 2148058168, // 0x8008C438
      type: "code",
      name: "strlen" },
{
      addr: 2148058256, // 0x8008C490
      type: "code",
      name: "sprintf",
      desc: "A0=out_addr" },
{
      addr: 2148058400, // 0x8008C520
      type: "code",
      name: "rmonPrintf",
      desc: "no-op in release" },
{
      addr: 2148058420, // 0x8008C534
      type: "code",
      name: "osSyncPrintf",
      desc: "no-op in release" },
{
      addr: 2148058564, // 0x8008C5C4
      type: "code",
      name: "alCSPNew" },
{
      addr: 2148065316, // 0x8008E024
      type: "code",
      name: "alSeqpNew" },
{
      addr: 2148065496, // 0x8008E0D8
      type: "code",
      name: "__seqplayer_o_03EC" },
{
      addr: 2148067584, // 0x8008E900
      type: "code",
      name: "__seqplayer_o_0400" },
{
      addr: 2148067692, // 0x8008E96C
      type: "code",
      name: "__seqplayer_o_0A54" },
{
      addr: 2148067772, // 0x8008E9BC
      type: "code",
      name: "__seqplayer_o_0244" },
{
      addr: 2148067872, // 0x8008EA20
      type: "code",
      name: "__seqplayer_o_0D18" },
{
      addr: 2148067956, // 0x8008EA74
      type: "code",
      name: "__seqplayer_o_0A1C" },
{
      addr: 2148068168, // 0x8008EB48
      type: "code",
      name: "__seqplayer_o_0284" },
{
      addr: 2148068280, // 0x8008EBB8
      type: "code",
      name: "__seqplayer_o_0320" },
{
      addr: 2148068308, // 0x8008EBD4
      type: "code",
      name: "__seqplayer_o_0C7C" },
{
      addr: 2148068376, // 0x8008EC18
      type: "code",
      name: "__seqplayer_o_04F8" },
{
      addr: 2148068668, // 0x8008ED3C
      type: "code",
      name: "__seqplayer_o_04E0" },
{
      addr: 2148068844, // 0x8008EDEC
      type: "code",
      name: "__seqplayer_o_0600" },
{
      addr: 2148069016, // 0x8008EE98
      type: "code",
      name: "__seqplayer_o_107C" },
{
      addr: 2148069100, // 0x8008EEEC
      type: "code",
      name: "__seqplayer_o_167C" },
{
      addr: 2148069228, // 0x8008EF6C
      type: "code",
      name: "__seqplayer_o_00BC" },
{
      addr: 2148069408, // 0x8008F020
      type: "code",
      name: "__seqplayer_o_0238" },
{
      addr: 2148069648, // 0x8008F110
      type: "code",
      name: "__seqplayer_o_05D8" },
{
      addr: 2148069712, // 0x8008F150
      type: "code",
      name: "alSynSetFXMix" },
{
      addr: 2148070164, // 0x8008F314
      type: "code",
      name: "alAudioFrame" },
{
      addr: 2148070596, // 0x8008F4C4
      type: "code",
      name: "alSynNew" },
{
      addr: 2148071472, // 0x8008F830
      type: "code",
      name: "osAiSetFrequency" },
{
      addr: 2148071760, // 0x8008F950
      type: "code",
      name: "__CartRomHandle" },
{
      addr: 2148071876, // 0x8008F9C4
      type: "code",
      name: "osCartRomInit" },
{
      addr: 2148072144, // 0x8008FAD0
      type: "code",
      name: "osEepromProbe" },
{
      addr: 2148072272, // 0x8008FB50
      type: "code",
      name: "osEepromRead" },
{
      addr: 2148072680, // 0x8008FCE8
      type: "code",
      name: "__conteepread_o_00A8" },
{
      addr: 2148072816, // 0x8008FD70
      type: "code",
      name: "osEepromWrite" },
{
      addr: 2148073176, // 0x8008FED8
      type: "code",
      name: "__conteepwrite_o_00AC" },
{
      addr: 2148073344, // 0x8008FF80
      type: "code",
      name: "__osEepStatus" },
{
      addr: 2148073760, // 0x80090120
      type: "code",
      name: "osContGetReadData" },
{
      addr: 2148073916, // 0x800901BC
      type: "code",
      name: "osContStartReadData" },
{
      addr: 2148074052, // 0x80090244
      type: "code",
      name: "__contreaddata_o_0028" },
{
      addr: 2148074736, // 0x800904F0
      type: "code",
      name: "osEPiReadIo" },
{
      addr: 2148074832, // 0x80090550
      type: "code",
      name: "osEPiWriteIo" },
{
      addr: 2148074928, // 0x800905B0
      type: "code",
      name: "osMotorInit" },
{
      addr: 2148075512, // 0x800907F8
      type: "code",
      name: "__osMotorAccess" },
{
      addr: 2148075840, // 0x80090940
      type: "code",
      name: "__osPfsDeclearPage" },
{
      addr: 2148076120, // 0x80090A58
      type: "code",
      name: "osPfsAllocateFile" },
{
      addr: 2148076620, // 0x80090C4C
      type: "code",
      name: "__pfsallocatefile_o_0178" },
{
      addr: 2148076912, // 0x80090D70
      type: "code",
      name: "__osPfsReleasePages" },
{
      addr: 2148077016, // 0x80090DD8
      type: "code",
      name: "osPfsDeleteFile" },
{
      addr: 2148077340, // 0x80090F1C
      type: "code",
      name: "__pfsdeletefile_o_00EC" },
{
      addr: 2148077436, // 0x80090F7C
      type: "code",
      name: "alHeapCheck" },
{
      addr: 2148077856, // 0x80091120
      type: "code",
      name: "osPfsFreeBlocks" },
{
      addr: 2148078128, // 0x80091230
      type: "code",
      name: "osPfsInitPak" },
{
      addr: 2148078632, // 0x80091428
      type: "code",
      name: "__pfsinitpak_o_0050" },
{
      addr: 2148080192, // 0x80091A40
      type: "code",
      name: "osPfsRepairId" },
{
      addr: 2148080288, // 0x80091AA0
      type: "code",
      name: "osPfsFindFile" },
{
      addr: 2148080704, // 0x80091C40
      type: "code",
      name: "__osPfsSelectBank" },
{
      addr: 2148080816, // 0x80091CB0
      type: "code",
      name: "osCreatePiManager" },
{
      addr: 2148081216, // 0x80091E40
      type: "code",
      name: "__osPiRawStartDma" },
{
      addr: 2148081224, // 0x80091E48
      type: "code",
      name: "__osPiTable" },
{
      addr: 2148081228, // 0x80091E4C
      type: "code",
      name: "__osPiDevMgr" },
{
      addr: 2148081332, // 0x80091EB4
      type: "code",
      name: "__Dom1SpeedParam" },
{
      addr: 2148081424, // 0x80091F10
      type: "code",
      name: "__osSiRawStartDma" },
{
      addr: 2148081448, // 0x80091F28
      type: "code",
      name: "__osCurrentHandle" },
{
      addr: 2148081456, // 0x80091F30
      type: "code",
      name: "__osPiTable" },
{
      addr: 2148081460, // 0x80091F34
      type: "code",
      name: "__osPiDevMgr" },
{
      addr: 2148081600, // 0x80091FC0
      type: "code",
      name: "__osSpRawStartDma" },
{
      addr: 2148082576, // 0x80092390
      type: "code",
      name: "osViSetSpecialFeatures" },
{
      addr: 2148082944, // 0x80092500
      type: "code",
      name: "__osViSwapContext" },
{
      addr: 2148083728, // 0x80092810
      type: "code",
      name: "osAfterPreNMI" },
{
      addr: 2148085420, // 0x80092EAC
      type: "code",
      name: "__osEnqueueAndYield" },
{
      addr: 2148085756, // 0x80092FFC
      type: "code",
      name: "__osPopThread" },
{
      addr: 2148086176, // 0x800931A0
      type: "code",
      name: "osGetMemSize" },
{
      addr: 2148087072, // 0x80093520
      type: "code",
      name: "__osDisableInt" },
{
      addr: 2148087184, // 0x80093590
      type: "code",
      name: "__osRestoreInt" },
{
      addr: 2148087216, // 0x800935B0
      type: "code",
      name: "osSetEventMesg" },
{
      addr: 2148087392, // 0x80093660
      type: "code",
      name: "__osSetHWIntrRoutine" },
{
      addr: 2148087680, // 0x80093780
      type: "code",
      name: "osGetCount" },
{
      addr: 2148087712, // 0x800937A0
      type: "code",
      name: "__osProbeTLB" },
{
      addr: 2148088096, // 0x80093920
      type: "code",
      name: "osSetTimer" },
{
      addr: 2148088256, // 0x800939C0
      type: "code",
      name: "alLoadParam" },
{
      addr: 2148088684, // 0x80093B6C
      type: "code",
      name: "alRaw16Pull" },
{
      addr: 2148089608, // 0x80093F08
      type: "code",
      name: "alAdpcmPull" },
{
      addr: 2148090272, // 0x800941A0
      type: "code",
      name: "alLoadParam" },
{
      addr: 2148090700, // 0x8009434C
      type: "code",
      name: "__load_o_0108" },
{
      addr: 2148091088, // 0x800944D0
      type: "code",
      name: "alAuxBusParam" },
{
      addr: 2148091136, // 0x80094500
      type: "code",
      name: "alAuxBusPull" },
{
      addr: 2148091308, // 0x800945AC
      type: "code",
      name: "alAuxBusParam" },
{
      addr: 2148091360, // 0x800945E0
      type: "code",
      name: "alMainBusParam" },
{
      addr: 2148091408, // 0x80094610
      type: "code",
      name: "alMainBusPull" },
{
      addr: 2148091680, // 0x80094720
      type: "code",
      name: "alMainBusParam" },
{
      addr: 2148091728, // 0x80094750
      type: "code",
      name: "alResampleParam" },
{
      addr: 2148091920, // 0x80094810
      type: "code",
      name: "alResamplePull" },
{
      addr: 2148092220, // 0x8009493C
      type: "code",
      name: "alResampleParam" },
{
      addr: 2148092416, // 0x80094A00
      type: "code",
      name: "alSeqGetLoc" },
{
      addr: 2148092480, // 0x80094A40
      type: "code",
      name: "alSeqNewMarker" },
{
      addr: 2148092648, // 0x80094AE8
      type: "code",
      name: "__seq_o_044C" },
{
      addr: 2148092756, // 0x80094B54
      type: "code",
      name: "alSeqSecToTicks" },
{
      addr: 2148092900, // 0x80094BE4
      type: "code",
      name: "alSeqTicksToSec" },
{
      addr: 2148093008, // 0x80094C50
      type: "code",
      name: "__alSeqNextDelta" },
{
      addr: 2148093108, // 0x80094CB4
      type: "code",
      name: "alSeqNextEvent" },
{
      addr: 2148093468, // 0x80094E1C
      type: "code",
      name: "alSeqNew" },
{
      addr: 2148093644, // 0x80094ECC
      type: "code",
      name: "alSeqSetLoc" },
{
      addr: 2148093700, // 0x80094F04
      type: "code",
      name: "__seq_o_011C" },
{
      addr: 2148093720, // 0x80094F18
      type: "code",
      name: "__seq_o_0040" },
{
      addr: 2148093768, // 0x80094F48
      type: "code",
      name: "__seq_o_0020" },
{
      addr: 2148093848, // 0x80094F98
      type: "code",
      name: "__seq_o_0104" },
{
      addr: 2148093936, // 0x80094FF0
      type: "code",
      name: "alSynSetPriority" },
{
      addr: 2148093952, // 0x80095000
      type: "code",
      name: "alSynAllocFX" },
{
      addr: 2148094112, // 0x800950A0
      type: "code",
      name: "__osAiDeviceBusy" },
{
      addr: 2148094144, // 0x800950C0
      type: "code",
      name: "__osSpDeviceBusy" },
{
      addr: 2148094176, // 0x800950E0
      type: "code",
      name: "__osSpGetStatus" },
{
      addr: 2148094192, // 0x800950F0
      type: "code",
      name: "__osSpSetStatus" },
{
      addr: 2148094208, // 0x80095100
      type: "code",
      name: "__osSpSetPc" },
{
      addr: 2148094628, // 0x800952A4
      type: "code",
      name: "__osSiGetAccess" },
{
      addr: 2148094736, // 0x80095310
      type: "code",
      name: "__osSiRelAccess" },
{
      addr: 2148094784, // 0x80095340
      type: "code",
      name: "osPiGetCmdQueue" },
{
      addr: 2148097860, // 0x80095F44
      type: "code",
      name: "alFxNew" },
{
      addr: 2148099036, // 0x800963DC
      type: "code",
      name: "alEnvmixerNew" },
{
      addr: 2148099220, // 0x80096494
      type: "code",
      name: "alLoadNew" },
{
      addr: 2148099396, // 0x80096544
      type: "code",
      name: "alResampleNew" },
{
      addr: 2148099536, // 0x800965D0
      type: "code",
      name: "alAuxBusNew" },
{
      addr: 2148099628, // 0x8009662C
      type: "code",
      name: "alMainBusNew" },
{
      addr: 2148099720, // 0x80096688
      type: "code",
      name: "alSaveNew" },
{
      addr: 2148099792, // 0x800966D0
      type: "code",
      name: "_ldexpf",
      desc: "multiply floating-point number by integral power of 2" },
{
      addr: 2148099828, // 0x800966F4
      type: "code",
      name: "_frexpf",
      desc: "convert floating-point number to fractional and integral components" },
{
      addr: 2148100052, // 0x800967D4
      type: "code",
      name: "alEnvmixerParam" },
{
      addr: 2148100264, // 0x800968A8
      type: "code",
      name: "alEnvmixerPull" },
{
      addr: 2148101072, // 0x80096BD0
      type: "code",
      name: "alEnvmixerParam" },
{
      addr: 2148101284, // 0x80096CA4
      type: "code",
      name: "__env_o_01E0" },
{
      addr: 2148102268, // 0x8009707C
      type: "code",
      name: "__env_o_0718" },
{
      addr: 2148102908, // 0x800972FC
      type: "code",
      name: "__env_o_027C" },
{
      addr: 2148103040, // 0x80097380
      type: "code",
      name: "_doModFunc" },
{
      addr: 2148103180, // 0x8009740C
      type: "code",
      name: "alFxParamHdl" },
{
      addr: 2148103676, // 0x800975FC
      type: "code",
      name: "alFxParam" },
{
      addr: 2148103696, // 0x80097610
      type: "code",
      name: "_filterBuffer" },
{
      addr: 2148103852, // 0x800976AC
      type: "code",
      name: "_loadOutputBuffer" },
{
      addr: 2148103924, // 0x800976F4
      type: "code",
      name: "alFxParam" },
{
      addr: 2148104388, // 0x800978C4
      type: "code",
      name: "_loadBuffer" },
{
      addr: 2148104440, // 0x800978F8
      type: "code",
      name: "__reverb_o_0178" },
{
      addr: 2148104756, // 0x80097A34
      type: "code",
      name: "_saveBuffer" },
{
      addr: 2148104976, // 0x80097B10
      type: "code",
      name: "__reverb_o_0154" },
{
      addr: 2148105124, // 0x80097BA4
      type: "code",
      name: "alFxPull" },
{
      addr: 2148105344, // 0x80097C80
      type: "code",
      name: "__reverb_o_00C4" },
{
      addr: 2148105712, // 0x80097DF0
      type: "code",
      name: "__reverb_o_024C" },
{
      addr: 2148105868, // 0x80097E8C
      type: "code",
      name: "__reverb_o_05D0" },
{
      addr: 2148106016, // 0x80097F20
      type: "code",
      name: "alSaveParam" },
{
      addr: 2148106056, // 0x80097F48
      type: "code",
      name: "alSavePull" },
{
      addr: 2148106184, // 0x80097FC8
      type: "code",
      name: "alSaveParam" },
{
      addr: 2148106224, // 0x80097FF0
      type: "code",
      name: "__osPfsInodeCache" },
{
      addr: 2148106276, // 0x80098024
      type: "code",
      name: "__osIdCheckSum" },
{
      addr: 2148106344, // 0x80098068
      type: "code",
      name: "__osRepairPackId" },
{
      addr: 2148106480, // 0x800980F0
      type: "code",
      name: "__osPfsRWInode" },
{
      addr: 2148107092, // 0x80098354
      type: "code",
      name: "__osCheckPackId" },
{
      addr: 2148107304, // 0x80098428
      type: "code",
      name: "__osCheckId" },
{
      addr: 2148107448, // 0x800984B8
      type: "code",
      name: "__osGetId" },
{
      addr: 2148107488, // 0x800984E0
      type: "code",
      name: "__osGetId" },
{
      addr: 2148107908, // 0x80098684
      type: "code",
      name: "__osCheckId" },
{
      addr: 2148107948, // 0x800986AC
      type: "code",
      name: "__osCheckPackId" },
{
      addr: 2148108092, // 0x8009873C
      type: "code",
      name: "__osPfsRWInode" },
{
      addr: 2148108304, // 0x80098810
      type: "code",
      name: "__osRepairPackId" },
{
      addr: 2148108928, // 0x80098A80
      type: "code",
      name: "__osContRamRead" },
{
      addr: 2148109052, // 0x80098AFC
      type: "code",
      name: "__osIdCheckSum" },
{
      addr: 2148109120, // 0x80098B40
      type: "code",
      name: "__osSumcalc" },
{
      addr: 2148109172, // 0x80098B74
      type: "code",
      name: "__osPfsInodeCacheBank" },
{
      addr: 2148109173, // 0x80098B75
      type: "code",
      name: "__osPfsInodeCacheChannel" },
{
      addr: 2148109440, // 0x80098C80
      type: "code",
      name: "__osContRamWrite" },
{
      addr: 2148109984, // 0x80098EA0
      type: "code",
      name: "__osContDataCrc" },
{
      addr: 2148110108, // 0x80098F1C
      type: "code",
      name: "__osContAddressCrc" },
{
      addr: 2148110224, // 0x80098F90
      type: "code",
      name: "__osDevMgrMain" },
{
      addr: 2148111184, // 0x80099350
      type: "code",
      name: "__osEPiRawReadIo" },
{
      addr: 2148111552, // 0x800994C0
      type: "code",
      name: "__osEPiRawWriteIo" },
{
      addr: 2148111920, // 0x80099630
      type: "code",
      name: "osPfsChecker" },
{
      addr: 2148113744, // 0x80099D50
      type: "code",
      name: "__osPfsGetStatus" },
{
      addr: 2148113872, // 0x80099DD0
      type: "code",
      name: "__osPfsRequestOneChannel" },
{
      addr: 2148113984, // 0x80099E40
      type: "code",
      name: "__pfsgetstatus_o_0030" },
{
      addr: 2148114020, // 0x80099E64
      type: "code",
      name: "__osPfsGetStatus" },
{
      addr: 2148114132, // 0x80099ED4
      type: "code",
      name: "__pfsgetstatus_o_0084" },
{
      addr: 2148114272, // 0x80099F60
      type: "code",
      name: "__osSpRawReadIo" },
{
      addr: 2148114352, // 0x80099FB0
      type: "code",
      name: "__osSpRawWriteIo" },
{
      addr: 2148114432, // 0x8009A000
      type: "code",
      name: "__osResetGlobalIntMask" },
{
      addr: 2148114512, // 0x8009A050
      type: "code",
      name: "__osSetGlobalIntMask" },
{
      addr: 2148114576, // 0x8009A090
      type: "code",
      name: "osYieldThread" },
{
      addr: 2148114656, // 0x8009A0E0
      type: "code",
      name: "alFilterNew" },
{
      addr: 2148114688, // 0x8009A100
      type: "code",
      name: "__osSpDeviceBusy" },
{
      addr: 2148277364, // 0x800C1C74
      type: "data",
      name: "overlay_table" },
{
      addr: 2148282356, // 0x800C2FF4
      type: "data",
      name: "rng_seed" },
{
      addr: 2148287312, // 0x800C4350
      type: "data",
      name: "model_info" },
{
      addr: 2148292986, // 0x800C597A
      type: "u16",
      name: "cur_board_scene_state",
      desc: "Determines how the board scene starts up when (re)loaded" },
{
      addr: 2148313792, // 0x800CAAC0
      type: "data",
      name: "jt_ai_logic",
      desc: "Jump table for 8003E9B0" },
{
      addr: 2148315232, // 0x800CB060
      type: "data",
      name: "jt_spacetype_to_turneffect",
      desc: "Jump table for space type to turn effect" },
{
      addr: 2148330124, // 0x800CEA8C
      type: "data",
      name: "__ALSndPlayer*sndp" },
{
      addr: 2148340464, // 0x800D12F0
      type: "data",
      name: "main_fs_rom_location" },
{
      addr: 2148340468, // 0x800D12F4
      type: "data",
      name: "main_fs_dir_count",
      desc: "Number of directories in main filesystem" },
{
      addr: 2148340480, // 0x800D1300
      type: "data",
      name: "main_fs_cur_dir_file_count",
      desc: "Count of files in directory being accessed" },
{
      addr: 2148360240, // 0x800D6030
      type: "data",
      name: "perm_heap_addr",
      desc: "Address of permanent heap" },
{
      addr: 2148360256, // 0x800D6040
      type: "data",
      name: "temp_heap_addr",
      desc: "Address of temporary heap" },
{
      addr: 2148368648, // 0x800D8108
      type: "data",
      name: "space_data",
      desc: "pointer to space data parsed from board def file" },
{
      addr: 2148368656, // 0x800D8110
      type: "data",
      name: "chain_data_addr",
      desc: "pointer to array of chain lengths and indices" },
{
      addr: 2148453156, // 0x800ECB24
      type: "data",
      name: "debug_font_color",
      desc: "16 color values" },
{
      addr: 2148454722, // 0x800ED142
      type: "u16",
      name: "bank_coins",
      desc: "Coins in bank" },
{
      addr: 2148454724, // 0x800ED144
      type: "u16",
      name: "bank_stars",
      desc: "Stars in bank" },
{
      addr: 2148454728, // 0x800ED148
      type: "u16",
      name: "enabled_feature_flags" },
{
      addr: 2148454802, // 0x800ED192
      type: "u16",
      name: "times_passed_start",
      desc: "Number of times the start space has been passed" },
{
      addr: 2148455760, // 0x800ED550
      type: "u16",
      name: "max_objects",
      desc: "set from InitObjectSystem" },
{
      addr: 2148455879, // 0x800ED5C7
      type: "u8",
      name: "total_turns",
      desc: "Total game turns" },
{
      addr: 2148455881, // 0x800ED5C9
      type: "u8",
      name: "current_turn",
      desc: "Elapsed turns" },
{
      addr: 2148455900, // 0x800ED5DC
      type: "u16",
      name: "current_player_index",
      desc: "Player who's turn is active" },
{
      addr: 2148469236, // 0x800F09F4
      type: "u32",
      name: "scene",
      desc: "Current scene" },
{
      addr: 2148478172, // 0x800F2CDC
      type: "u16",
      name: "hidden_block_space_index",
      desc: "Space index of hidden block" },
{
      addr: 2148479665, // 0x800F32B1
      type: "u8",
      name: "p1_cpu_difficulty_1",
      desc: "Player 1 CPU difficulty" },
{
      addr: 2148479666, // 0x800F32B2
      type: "u8",
      name: "p1_cpu_difficulty_2",
      desc: "Player 1 CPU difficulty" },
{
      addr: 2148479668, // 0x800F32B4
      type: "u8",
      name: "p1_char",
      desc: "Player 1 character" },
{
      addr: 2148479672, // 0x800F32B8
      type: "u16",
      name: "p1_coins",
      desc: "Player 1 coin count" },
{
      addr: 2148479674, // 0x800F32BA
      type: "s16",
      name: "p1_minigame_coins",
      desc: "Player 1 coins in current Mini-Game" },
{
      addr: 2148479676, // 0x800F32BC
      type: "u16",
      name: "p1_stars",
      desc: "Player 1 star count" },
{
      addr: 2148479678, // 0x800F32BE
      type: "u16",
      name: "p1_cur_chain_index",
      desc: "Player 1 current chain index" },
{
      addr: 2148479680, // 0x800F32C0
      type: "u16",
      name: "p1_cur_space_index",
      desc: "Player 1 current space index" },
{
      addr: 2148479682, // 0x800F32C2
      type: "u16",
      name: "p1_next_chain_index",
      desc: "Player 1 next chain index" },
{
      addr: 2148479684, // 0x800F32C4
      type: "u16",
      name: "p1_next_space_index",
      desc: "Player 1 next space index" },
{
      addr: 2148479686, // 0x800F32C6
      type: "u8",
      name: "p1_poisoned",
      desc: "Player 1 poisoned boolean" },
{
      addr: 2148479687, // 0x800F32C7
      type: "u8",
      name: "p1_turn_status",
      desc: "Color based on type of space landed on" },
{
      addr: 2148479700, // 0x800F32D4
      type: "u16",
      name: "p1_total_minigame_coins",
      desc: "Player 1 total Mini-Game coins collected" },
{
      addr: 2148479702, // 0x800F32D6
      type: "u16",
      name: "p1_total_coins",
      desc: "Player 1 total coins collected" },
{
      addr: 2148479704, // 0x800F32D8
      type: "u8",
      name: "p1_total_happening_spaces",
      desc: "Player 1 total number of Happening Spaces landed on" },
{
      addr: 2148479705, // 0x800F32D9
      type: "u8",
      name: "p1_total_red_spaces",
      desc: "Player 1 total number of red spaces landed on" },
{
      addr: 2148479706, // 0x800F32DA
      type: "u8",
      name: "p1_total_blue_spaces",
      desc: "Player 1 total number of blue spaces landed on" },
{
      addr: 2148479707, // 0x800F32DB
      type: "u8",
      name: "p1_total_minigame_spaces",
      desc: "Player 1 total number of Mini-Game spaces landed on" },
{
      addr: 2148479708, // 0x800F32DC
      type: "u8",
      name: "p1_total_chance_spaces",
      desc: "Player 1 total number of Chance Time spaces landed on" },
{
      addr: 2148479709, // 0x800F32DD
      type: "u8",
      name: "p1_total_mushroom_spaces",
      desc: "Player 1 total number of Mushroom spaces landed on" },
{
      addr: 2148479710, // 0x800F32DE
      type: "u8",
      name: "p1_total_bowser_spaces",
      desc: "Player 1 total number of Bowser spaces landed on" },
{
      addr: 2148479713, // 0x800F32E1
      type: "u8",
      name: "p2_cpu_difficulty_1",
      desc: "Player 2 CPU difficulty" },
{
      addr: 2148479714, // 0x800F32E2
      type: "u8",
      name: "p2_cpu_difficulty_2",
      desc: "Player 2 CPU difficulty" },
{
      addr: 2148479716, // 0x800F32E4
      type: "u8",
      name: "p2_char",
      desc: "Player 2 character" },
{
      addr: 2148479720, // 0x800F32E8
      type: "u16",
      name: "p2_coins",
      desc: "Player 2 coin count" },
{
      addr: 2148479722, // 0x800F32EA
      type: "s16",
      name: "p2_minigame_coins",
      desc: "Player 2 coins in current Mini-Game" },
{
      addr: 2148479724, // 0x800F32EC
      type: "u16",
      name: "p2_stars",
      desc: "Player 2 star count" },
{
      addr: 2148479726, // 0x800F32EE
      type: "u16",
      name: "p2_cur_chain_index",
      desc: "Player 2 current chain index" },
{
      addr: 2148479728, // 0x800F32F0
      type: "u16",
      name: "p2_cur_space_index",
      desc: "Player 2 current space index" },
{
      addr: 2148479730, // 0x800F32F2
      type: "u16",
      name: "p2_next_chain_index",
      desc: "Player 2 next chain index" },
{
      addr: 2148479732, // 0x800F32F4
      type: "u16",
      name: "p2_next_space_index",
      desc: "Player 2 next space index" },
{
      addr: 2148479734, // 0x800F32F6
      type: "u8",
      name: "p2_poisoned",
      desc: "Player 2 poisoned boolean" },
{
      addr: 2148479735, // 0x800F32F7
      type: "u8",
      name: "p2_turn_status",
      desc: "Color based on type of spaced landed on" },
{
      addr: 2148479748, // 0x800F3304
      type: "u16",
      name: "p2_total_minigame_coins",
      desc: "Player 2 total Mini-Game coins collected" },
{
      addr: 2148479750, // 0x800F3306
      type: "u16",
      name: "p2_total_coins",
      desc: "Player 2 total coins collected" },
{
      addr: 2148479752, // 0x800F3308
      type: "u8",
      name: "p2_total_happening_spaces",
      desc: "Player 2 total number of Happening spaces landed on" },
{
      addr: 2148479753, // 0x800F3309
      type: "u8",
      name: "p2_total_red_spaces",
      desc: "Player 2 total number of red spaces landed on" },
{
      addr: 2148479754, // 0x800F330A
      type: "u8",
      name: "p2_total_blue_spaces",
      desc: "Player 2 total number of blue spaces landed on" },
{
      addr: 2148479755, // 0x800F330B
      type: "u8",
      name: "p2_total_minigame_spaces",
      desc: "Player 2 total number of Mini-Game spaces landed on" },
{
      addr: 2148479756, // 0x800F330C
      type: "u8",
      name: "p2_total_chance_spaces",
      desc: "Player 2 total number of Chance Time spaces landed on" },
{
      addr: 2148479757, // 0x800F330D
      type: "u8",
      name: "p2_total_mushroom_spaces",
      desc: "Player 2 total number of Mushroom spaces landed on" },
{
      addr: 2148479758, // 0x800F330E
      type: "u8",
      name: "p2_total_bowser_spaces",
      desc: "Player 2 total number of Bowser spaces landed on" },
{
      addr: 2148479761, // 0x800F3311
      type: "u8",
      name: "p3_cpu_difficulty_1",
      desc: "Player 3 CPU difficulty" },
{
      addr: 2148479762, // 0x800F3312
      type: "u8",
      name: "p3_cpu_difficulty_2",
      desc: "Player 3 CPU difficulty" },
{
      addr: 2148479764, // 0x800F3314
      type: "u8",
      name: "p3_char",
      desc: "Player 3 character" },
{
      addr: 2148479768, // 0x800F3318
      type: "u16",
      name: "p3_coins",
      desc: "Player 3 coin count" },
{
      addr: 2148479770, // 0x800F331A
      type: "s16",
      name: "p3_minigame_coins",
      desc: "Player 3 coins in current Mini-Game" },
{
      addr: 2148479772, // 0x800F331C
      type: "u16",
      name: "p3_stars",
      desc: "Player 3 star count" },
{
      addr: 2148479774, // 0x800F331E
      type: "u16",
      name: "p3_cur_chain_index",
      desc: "Player 3 current chain index" },
{
      addr: 2148479776, // 0x800F3320
      type: "u16",
      name: "p3_cur_space_index",
      desc: "Player 3 current space index" },
{
      addr: 2148479778, // 0x800F3322
      type: "u16",
      name: "p3_next_chain_index",
      desc: "Player 3 next chain index" },
{
      addr: 2148479780, // 0x800F3324
      type: "u16",
      name: "p3_next_space_index",
      desc: "Player 3 next space index" },
{
      addr: 2148479782, // 0x800F3326
      type: "u8",
      name: "p3_poisoned",
      desc: "Player 3 poisoned boolean" },
{
      addr: 2148479783, // 0x800F3327
      type: "u8",
      name: "p3_turn_status",
      desc: "Color based on type of space landed on" },
{
      addr: 2148479796, // 0x800F3334
      type: "u16",
      name: "p3_total_minigame_coins",
      desc: "Player 3 total Mini-Game coins collected" },
{
      addr: 2148479798, // 0x800F3336
      type: "u16",
      name: "p3_total_coins",
      desc: "Player 3 total coins collected" },
{
      addr: 2148479800, // 0x800F3338
      type: "u8",
      name: "p3_total_happening_spaces",
      desc: "Player 3 total number of Happening spaces landed on" },
{
      addr: 2148479801, // 0x800F3339
      type: "u8",
      name: "p3_total_red_spaces",
      desc: "Player 3 total number of red spaces landed on" },
{
      addr: 2148479802, // 0x800F333A
      type: "u8",
      name: "p3_total_blue_spaces",
      desc: "Player 3 total number of blue spaces landed on" },
{
      addr: 2148479803, // 0x800F333B
      type: "u8",
      name: "p3_total_minigame_spaces",
      desc: "Player 3 total number of Mini-Game spaces landed on" },
{
      addr: 2148479804, // 0x800F333C
      type: "u8",
      name: "p3_total_chance_spaces",
      desc: "Player 3 total number of Chance Time spaces landed on" },
{
      addr: 2148479805, // 0x800F333D
      type: "u8",
      name: "p3_total_mushroom_spaces",
      desc: "Player 3 total number of Mushroom spaces landed on" },
{
      addr: 2148479806, // 0x800F333E
      type: "u8",
      name: "p3_total_bowser_spaces",
      desc: "Player 3 total number of Bowser spaces landed on" },
{
      addr: 2148479809, // 0x800F3341
      type: "u8",
      name: "p3_cpu_difficulty_1",
      desc: "Player 3 CPU difficulty" },
{
      addr: 2148479810, // 0x800F3342
      type: "u8",
      name: "p3_cpu_difficulty_2",
      desc: "Player 3 CPU difficulty" },
{
      addr: 2148479812, // 0x800F3344
      type: "u8",
      name: "p4_char",
      desc: "Player 4 character" },
{
      addr: 2148479816, // 0x800F3348
      type: "u16",
      name: "p4_coins",
      desc: "Player 4 coin count" },
{
      addr: 2148479818, // 0x800F334A
      type: "s16",
      name: "p4_minigame_coins",
      desc: "Player 4 coins in current Mini-Game" },
{
      addr: 2148479820, // 0x800F334C
      type: "u16",
      name: "p4_stars",
      desc: "Player 4 star count" },
{
      addr: 2148479822, // 0x800F334E
      type: "u16",
      name: "p4_cur_chain_index",
      desc: "Player 4 current chain index" },
{
      addr: 2148479824, // 0x800F3350
      type: "u16",
      name: "p4_cur_space_index",
      desc: "Player 4 current space index" },
{
      addr: 2148479826, // 0x800F3352
      type: "u16",
      name: "p4_next_chain_index",
      desc: "Player 4 next chain index" },
{
      addr: 2148479828, // 0x800F3354
      type: "u16",
      name: "p4_next_space_index",
      desc: "Player 4 next space index" },
{
      addr: 2148479830, // 0x800F3356
      type: "u8",
      name: "p4_poisoned",
      desc: "Player 4 poisoned boolean" },
{
      addr: 2148479831, // 0x800F3357
      type: "u8",
      name: "p4_turn_status",
      desc: "Color based on type of space landed on" },
{
      addr: 2148479844, // 0x800F3364
      type: "u16",
      name: "p4_total_minigame_coins",
      desc: "Player 4 total Mini-Game coins collected" },
{
      addr: 2148479846, // 0x800F3366
      type: "u16",
      name: "p4_total_coins",
      desc: "Player 4 total coins collected" },
{
      addr: 2148479848, // 0x800F3368
      type: "u8",
      name: "p4_total_happening_spaces",
      desc: "Player 4 total number of Happening spaces landed on" },
{
      addr: 2148479849, // 0x800F3369
      type: "u8",
      name: "p4_total_red_spaces",
      desc: "Player 4 total number of red spaces landed on" },
{
      addr: 2148479850, // 0x800F336A
      type: "u8",
      name: "p4_total_blue_spaces",
      desc: "Player 4 total number of blue spaces landed on" },
{
      addr: 2148479851, // 0x800F336B
      type: "u8",
      name: "p4_total_minigame_spaces",
      desc: "Player 4 total number of Mini-Game spaces landed on" },
{
      addr: 2148479852, // 0x800F336C
      type: "u8",
      name: "p4_total_chance_spaces",
      desc: "Player 4 total number of Chance Time spaces landed on" },
{
      addr: 2148479853, // 0x800F336D
      type: "u8",
      name: "p4_total_mushroom_spaces",
      desc: "Player 4 total number of Mushroom spaces landed on" },
{
      addr: 2148479854, // 0x800F336E
      type: "u8",
      name: "p4_total_bowser_spaces",
      desc: "Player 4 total number of Bowser spaces landed on" }
];
