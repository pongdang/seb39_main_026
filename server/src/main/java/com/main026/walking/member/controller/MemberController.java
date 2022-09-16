package com.main026.walking.member.controller;

import com.main026.walking.member.dto.MemberDto;
import com.main026.walking.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public MemberDto.Response signUp(@RequestBody MemberDto.Post memberPostDto){
        return memberService.saveMember(memberPostDto);
    }

    @GetMapping("/{memberId}")
    public MemberDto.Response getMember(@PathVariable Long memberId){
        return memberService.findMember(memberId);
    }

    @PatchMapping("/{memberId}")
    public MemberDto.Response patchMember(@PathVariable Long memberId,MemberDto.Patch patchDto){
        return memberService.updateMember(memberId,patchDto);
    }

    @DeleteMapping("/{memberId}")
    public String deleteMember(@PathVariable Long memberId){
        memberService.deleteMember(memberId);
        return "회원 삭제 완료";
    }


}
